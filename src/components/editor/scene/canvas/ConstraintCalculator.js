function marginTop(element) {
    return element.props.marginTop || element.props.marginVertical || element.props.margin || 0;
}

function marginBottom(element) {
    return element.props.marginBottom || element.props.marginVertical || element.props.margin || 0;
}

function marginStart(element) {
    return element.props.marginStart || element.props.marginHorizontal || element.props.margin || 0;
}

function marginEnd(element) {
    return element.props.marginEnd || element.props.marginHorizontal || element.props.margin || 0;
}

function isWidthConstrained(element) {
    return element.props.constraintWidth !== undefined
        || element.props.constraintWidthPercent !== undefined
        || (element.props.constraintStart !== undefined && element.props.constraintEnd !== undefined);
}

// May be needed in future
// function isHeightConstrained(element) {
//     return element.props.constraintHeight !== undefined
//         || element.props.constraintHeightPercent !== undefined
//         || (element.props.constraintTop !== undefined && element.props.constraintBottom !== undefined);
// }

function width(element, parentWidth, otherStyles) {
    if (element === null) {
        return parentWidth;
    }
    if (otherStyles[element.props.id] && otherStyles[element.props.id].width !== undefined) {
        return otherStyles[element.props.id].width;
    }
    if (element.props.constraintWidth !== undefined) {
        return element.props.constraintWidth;
    }
    else if (element.props.constraintWidthPercent !== undefined) {
        return element.props.constraintWidthPercent * parentWidth;
    }
    else if (element.props.constraintStart && element.props.constraintEnd) {
        let start = element.props.constraintStart;
        let end = element.props.constraintEnd;
        let startRef = start.ref !== null ? otherStyles[start.ref][start.side] : 0;
        let endRef = end.ref !== null ? otherStyles[end.ref][end.side] : parentWidth;
        return endRef - startRef - marginStart(element) - marginEnd(element);
    }
    else {
        return element.props.defaultWidth;
    }
}

function height(element, parentHeight, otherStyles) {
    if (element === null) {
        return parentHeight;
    }
    if (otherStyles[element.props.id] && otherStyles[element.props.id].height !== undefined) {
        return otherStyles[element.props.id].height;
    }
    if (element.props.constraintHeight !== undefined) {
        return element.props.constraintHeight;
    }
    else if (element.props.constraintHeightPercent !== undefined) {
        return element.props.constraintHeightPercent * parentHeight;
    }
    else if (element.props.constraintTop && element.props.constraintBottom) {
        let top = element.props.constraintTop;
        let bottom = element.props.constraintBottom;
        let topRef = top.ref !== null ? otherStyles[top.ref][top.side] : 0;
        let bottomRef = bottom.ref !== null ? otherStyles[bottom.ref][bottom.side] : parentHeight;
        return bottomRef - topRef - marginTop(element) - marginBottom(element);
    }
    else {
        return element.props.defaultHeight;
    }
}

function top(element, height, parentHeight, otherStyles) {
    if (element === null) {
        return 0;
    }
    if (otherStyles[element.props.id] && otherStyles[element.props.id].top !== undefined) {
        return otherStyles[element.props.id].top;
    }
    if (element.props.constraintTop) {
        let top = element.props.constraintTop;
        let ref = top.ref !== null ? otherStyles[top.ref][top.side] : 0;
        return ref + marginTop(element);
    }
    else if (element.props.constraintBottom) {
        let bottom = element.props.constraintBottom;
        let ref = bottom.ref !== null ? otherStyles[bottom.ref][bottom.side] : parentHeight;
        return ref - height - marginBottom(element);
    }
    else if (element.props.constraintCenterY) {
        let c = element.props.constraintCenterY;
        let heightRef = c.ref !== null ? otherStyles[c.ref].height : parentHeight;
        let heightMe = height;
        let _marginTop = marginTop(element);
        let _marginBottom = marginBottom(element);
        let skew = (heightRef - heightMe - _marginTop - _marginBottom) / 2;
        return (c.ref !== null ? otherStyles[c.ref].top : 0) + skew + _marginTop;
    }
    else {
        return element.props.posY + marginTop(element);
    }
}

function left(element, width, parentWidth, otherStyles) {
    if (element === null) {
        return 0;
    }
    if (otherStyles[element.props.id] && otherStyles[element.props.id].left !== undefined) {
        return otherStyles[element.props.id].left;
    }
    if (element.props.constraintStart) {
        let c = element.props.constraintStart;
        let ref = c.ref !== null ? otherStyles[c.ref][c.side] : 0;
        return ref + marginStart(element);
    }
    else if (element.props.constraintEnd) {
        let c = element.props.constraintEnd;
        let ref = c.ref !== null ? otherStyles[c.ref][c.side] : parentWidth;
        return ref - marginEnd(element) - width;
    }
    else if (element.props.constraintCenterX) {
        let c = element.props.constraintCenterX;
        let widthRef = c.ref !== null ? otherStyles[c.ref].width : parentWidth;
        let widthMe = width;
        let _marginStart = marginStart(element);
        let _marginEnd = marginEnd(element);
        let skew = (widthRef - widthMe - _marginStart - _marginEnd) / 2;
        return (c.ref !== null ? otherStyles[c.ref].left : 0) + skew + _marginStart;
    }
    else {
        return element.props.posX + marginStart(element);
    }
}

function solveSpreadChain(componentsMeasures, overallSpace, insideChain) {
    const consumed = componentsMeasures.reduce((a, b) => a + b, 0);
    const spaceCount = insideChain ? componentsMeasures.length - 1 : componentsMeasures.length + 1;
    const leftover = overallSpace - consumed;
    const spacing = leftover / spaceCount;
    let curr = insideChain ? 0 : spacing;
    let out = [];
    componentsMeasures.forEach(measure => {
        out.push(curr);
        curr += measure;
        curr += spacing;
    });
    return out;
}

function solvePackedChain(componentsMeasures, overallSpace, bias, spacing) {
    const consumed = componentsMeasures.reduce((a, b) => a + b, 0) + (componentsMeasures.length - 1) * spacing;
    const leftover = overallSpace - consumed;
    const beforeSpacing = leftover * bias;
    let curr = beforeSpacing;
    let out = [];
    componentsMeasures.forEach(measure => {
        out.push(curr);
        curr += measure + spacing;
    });
    return out;
}

function solveWeightedChain(componentWeights, overallSpace, spacing) {
    const totalWeight = componentWeights.reduce((a, b) => a + b, 0);
    const spaceUnit = (overallSpace - (componentWeights.length - 1) * spacing) / totalWeight;
    return componentWeights.map(w => w * spaceUnit);
}

function solveHorizontalChain(reactChildren, parentWidth, parentHeight, otherStyles) {
    const head = reactChildren[0];
    const chainType = head.props.constraintChain;
    if (chainType === 'spread' || chainType === 'spread_inside') {
        const widths = reactChildren.map(child => {
            return width(child, parentWidth, parentHeight, otherStyles) + marginStart(child) + marginEnd(child);
        });
        const lefts = solveSpreadChain(widths, parentWidth, chainType === 'spread_inside');
        const out = {};
        reactChildren.forEach((child, i) => {
            out[child.props.id] = {
                width: widths[i],
                left: lefts[i] + marginStart(child)
            };
        });
        return out;
    }
    else if (chainType === 'packed') {
        const widths = reactChildren.map(child => {
            return width(child, parentWidth, parentHeight, otherStyles) + marginStart(child) + marginEnd(child);
        });
        let bias = head.props.constraintChainBias;
        if (bias === undefined || bias < 0.0 || bias > 1.0) bias = 0.5;
        let spacing = head.props.constraintSpacing || 0;
        const lefts = solvePackedChain(widths, parentWidth, bias, spacing);
        const out = {};
        reactChildren.forEach((child, i) => {
            out[child.props.id] = {
                width: widths[i],
                left: lefts[i] + marginStart(child)
            };
        });
        return out;
    }
    else if (chainType === 'weighted') {
        const weights = reactChildren.map(child => {
            let w = child.props.constraintWeight;
            if (w === undefined || w < 1)
                w = 1;
            return w;
        });
        const spacing = head.props.constraintSpacing || 0;
        const widths = solveWeightedChain(weights, parentWidth, spacing);
        let acc = 0;
        const out = {};
        reactChildren.forEach((child, i) => {
            out[child.props.id] = {
                width: widths[i] - marginStart(child) - marginEnd(child),
                left: acc + marginStart(child)
            };
            acc += widths[i] + spacing;
        });
        return out;
    }
}

function solveVerticalChain(reactChildren, parentWidth, parentHeight, otherStyles) {
    const head = reactChildren[0];
    const chainType = head.props.constraintChain;
    if (chainType === 'spread' || chainType === 'spread_inside') {
        const heights = reactChildren.map(child => {
            return height(child, parentWidth, parentHeight, otherStyles) + marginTop(child) + marginBottom(child);
        });
        const tops = solveSpreadChain(heights, parentHeight, chainType === 'spread_inside');
        const out = {};
        reactChildren.forEach((child, i) => {
            out[child.props.id] = {
                height: heights[i],
                top: tops[i] + marginTop(child)
            };
        });
        return out;
    }
    else if (chainType === 'packed') {
        const heights = reactChildren.map(child => {
            return height(child, parentWidth, parentHeight, otherStyles) + marginTop(child) + marginBottom(child);
        });
        let bias = head.props.constraintChainBias;
        if (bias === undefined || bias < 0.0 || bias > 1.0) bias = 0.5;
        const spacing = head.props.constraintSpacing || 0;
        const tops = solvePackedChain(heights, parentHeight, bias, spacing);
        const out = {};
        reactChildren.forEach((child, i) => {
            out[child.props.id] = {
                height: heights[i],
                top: tops[i] + marginTop(child)
            };
        });
        return out;
    }
    else if (chainType === 'weighted') {
        const weights = reactChildren.map(child => {
            let w = child.props.constraintWeight;
            if (w === undefined || w < 1)
                w = 1;
            return w;
        });
        const spacing = head.props.constraintSpacing || 0;
        const heights = solveWeightedChain(weights, parentHeight, spacing);
        let acc = 0;
        const out = {};
        reactChildren.forEach((child, i) => {
            out[child.props.id] = {
                height: heights[i] - marginTop(child) - marginBottom(child),
                top: acc + marginTop(child)
            };
            acc += heights[i] + spacing;
        });
        return out;
    }
}

function solveChain(reactChildren, parentWidth, parentHeight, otherStyles) {
    const head = reactChildren[0];
    if (head.props.constraintChainAxis === 'vertical') {
        return solveVerticalChain(reactChildren, parentWidth, parentHeight, otherStyles);
    } else {
        return solveHorizontalChain(reactChildren, parentWidth, parentHeight, otherStyles);
    }
}

function computeStyle(reactChild, parentWidth, parentHeight, otherStyles) {
    let _width, _height;
    if (reactChild.props.constraintRatio !== undefined) {
        if (isWidthConstrained(reactChild)) {
            _width = width(reactChild, parentWidth, otherStyles);
            _height = _width / reactChild.props.constraintRatio;
        } else {
            _height = height(reactChild, parentHeight, otherStyles);
            _width = _height * reactChild.props.constraintRatio;
        }
    } else {
        _width = width(reactChild, parentWidth, otherStyles);
        _height = height(reactChild, parentHeight, otherStyles);
    }
    let _top = top(reactChild, _height, parentHeight, otherStyles);
    let _left = left(reactChild, _width, parentWidth, otherStyles);
    return {
        width: _width,
        height: _height,
        top: _top,
        left: _left,
        start: _left,
        bottom: _height + _top,
        right: _width + _left,
        end: _width + _left
    };
}

function sortBasingOnDependencies(reactChildrenArray) {
    let deps = {};
    let map = {};
    reactChildrenArray.forEach(reactChild => {
        const myDeps = {};
        let count = 0;
        map[reactChild.props.id] = reactChild;
        if (reactChild.props.constraintTop && reactChild.props.constraintTop.ref != null && !myDeps[reactChild.props.constraintTop.ref]) {
            count++;
            myDeps[reactChild.props.constraintTop.ref] = true;
        }
        if (reactChild.props.constraintBottom && reactChild.props.constraintBottom.ref != null && !myDeps[reactChild.props.constraintBottom.ref]) {
            count++;
            myDeps[reactChild.props.constraintBottom.ref] = true;
        }
        if (reactChild.props.constraintStart && reactChild.props.constraintStart.ref != null && !myDeps[reactChild.props.constraintStart.ref]) {
            count++;
            myDeps[reactChild.props.constraintStart.ref] = true;
        }
        if (reactChild.props.constraintEnd && reactChild.props.constraintEnd.ref != null && !myDeps[reactChild.props.constraintEnd.ref]) {
            count++;
            myDeps[reactChild.props.constraintEnd.ref] = true;
        }
        if (reactChild.props.constraintCenterX && reactChild.props.constraintCenterX.ref != null && !myDeps[reactChild.props.constraintCenterX.ref]) {
            count++;
            myDeps[reactChild.props.constraintCenterX.ref] = true;
        }
        if (reactChild.props.constraintCenterY && reactChild.props.constraintCenterY.ref != null && !myDeps[reactChild.props.constraintCenterY.ref]) {
            count++;
            myDeps[reactChild.props.constraintCenterY.ref] = true;
        }
        myDeps.count = count;
        deps[reactChild.props.id] = myDeps;
    });
    const ready = {};
    const sorted = [];
    let left = reactChildrenArray.length;
    while (left > 0) {
        for (let id in deps) {
            for (let ref in deps[id]) {
                if (ready[ref]) {
                    delete deps[id][ref];
                    deps[id].count--;
                }
            }
            if (deps[id].count === 0 && !ready[id]) {
                ready[id] = true;
                left--;
                sorted.push(map[id]);
            }
        }
    }
    return sorted;
}

function findChains(reactChildren) {
    const heads = [];
    const next = {};
    const mapper = {};
    reactChildren.forEach(child => {
        mapper[child.props.id] = child;
        if (child.props.constraintChain !== undefined) {
            heads.push(child.props.id);
        }
        else if (child.props.constraintChainPrev !== undefined) {
            next[child.props.constraintChainPrev] = child.props.id;
        }
    });
    const chains = heads.map(head => {
        let chain = [mapper[head]];
        let curr = head;
        while(next[curr]) {
            chain.push(mapper[next[curr]]);
            curr = next[curr];
        }
        return chain;
    });
    return chains.filter(chain => chain.length > 1);
}

function computeStyles(reactChildren, parentWidth, parentHeight) {
    let styles = {};
    let async = [];
    reactChildren.forEach(child => {
        styles[child.props.id] = {};
        if (child.props.fluidHeight) {
            async.push(child.props.fluidHeight(child, parentWidth, parentHeight).then(m => {
                styles[child.props.id].height = m;
            }));
        }
        if (child.props.fluidWidth) {
            async.push(child.props.fluidWidth(child, parentWidth, parentHeight).then(m => {
                styles[child.props.id].width = m;
            }));
        }
    });
    return Promise.all(async).then(() => {
        let chains = findChains(reactChildren);
        chains.forEach(chain => {
            let solved = solveChain(chain, parentWidth, parentHeight, styles);
            styles = {
                ...styles,
                ...solved
            };
        });
        reactChildren.forEach(child => {
            styles[child.props.id] = computeStyle(child, parentWidth, parentHeight, styles);
        });
        return styles;
    });

}

function publishStyles(styles) {
    let out = {};
    for(let k in styles) {
        out[k] = {
            top: styles[k].top,
            left: styles[k].left,
            width: styles[k].width,
            height: styles[k].height
        }
    }
    return out;
}

class ConstraintCalculatorImpl {

    constructor() {
        this.pending = {};
        this.computed = {};
        this.public = {};
        this.events = {};
        this.size = 0;
        this.listenerId = 1;
    }

    createGroup() {
        const key = 'Group' + (++this.size);
        this.pending[key] = [];
        return key;
    }

    register(groupKey, element) {
        this.pending[groupKey].push(element);
        this.events[element.props.id] = this.events[element.props.id] || {};
    }

    finalizeGroup(groupKey) {
        this.pending[groupKey] = sortBasingOnDependencies(this.pending[groupKey]);
    }

    recomputeGroup(groupKey, width, height) {
        this.finalizeGroup.call(this, groupKey);
        let items = this.pending[groupKey];
        if (!items) {
            return Promise.resolve();
        }
        return computeStyles(items, width, height).then(styles => {
            this.computed = {
                ...this.computed,
                ...styles
            };
            this.public = {
                ...this.public,
                ...publishStyles(styles)
            }
            for (let id in styles) {
                for(let k in this.events[id]) this.events[id][k](this.public[id]);
            }
        });
    }

    deleteGroup(groupKey) {
        this.pending[groupKey].forEach(child => {
            delete this.computed[child.props.id];
        });
        delete this.pending[groupKey];
    }

    addListener(elementId, fn) {
        let key = this.listenerId++;
        if (!this.events[elementId]) this.events[elementId] = {};
        this.events[elementId][key] = style => fn(style);
        return key;
    }

    removeListener(elementId, key) {
        delete this.events[elementId][key];
    }

}

const ConstraintCalculator = new ConstraintCalculatorImpl();
export default ConstraintCalculator;
