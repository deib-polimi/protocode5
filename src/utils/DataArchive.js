const DataArchive = {
    Create(id, rels) {
        let relsObj = {};
        rels.forEach(field => {
            relsObj[field] = {};
        });
        return {
            list: [],
            data: {},
            rels: relsObj,
            _meta: {
                id,
                rels
            }
        }
    },
    Insert(archive, ...items) {
        let { _meta: { id, rels } } = archive;
        let nextRelsObj = {};
        rels.forEach(field => {
            nextRelsObj[field] = Object.assign({}, archive.rels[field]);
            items.forEach(item => {
                let val = item[field];
                if (nextRelsObj[field][val] === undefined) {
                    nextRelsObj[field][val] = [item[id]];
                } else {
                    nextRelsObj[field][val] = [...nextRelsObj[field][val], item[id]];
                }
            })
        });
        let nextData = Object.assign({}, archive.data);
        items.forEach(item => {
            nextData[item[id]] = item;
        })
        return {
            ...archive,
            list: [...archive.list, ...items.map(item => item[id])],
            data: nextData,
            rels: nextRelsObj
        }
    },
    Merge(archive, item) {
        let { _meta: { id } } = archive;
        return {
            ...archive,
            data: {
                ...archive.data,
                [item[id]]: {
                    ...archive.data[item[id]],
                    ...item
                }
            }
        }
    },
    Delete(archive, itemId) {
        let { _meta: { rels } } = archive;
        let dataWithoutItem = Object.assign({}, archive.data);
        let item = archive.data[itemId];
        if (!item) return archive;
        delete dataWithoutItem[itemId];
        let nextRelsObj = {};
        rels.forEach(field => {
            nextRelsObj[field] = {
                ...archive.rels[field],
                [item[field]]: archive.rels[field][item[field]].filter(el => el !== itemId)
            }
        })
        return {
            list: archive.list.filter(el => el !== itemId),
            data: dataWithoutItem,
            rels: nextRelsObj,
            _meta: archive._meta
        }
    },
    DeleteByRel(archive, rel, value) {
        let { _meta: { rels } } = archive;
        let itemsToDeleteIds = archive.rels[rel][value] || [];
        let itemsToDeleteHash = {};
        itemsToDeleteIds.forEach(id => itemsToDeleteHash[id] = 1);
        let dataWithoutItems = Object.assign({}, archive.data);
        itemsToDeleteIds.forEach(id => {
            delete dataWithoutItems[id];
        });
        let nextRelsObj = {};
        rels.forEach(field => {
            nextRelsObj[field] = Object.assign({}, archive.rels[field]);
            for (let v in nextRelsObj[field]) {
                nextRelsObj[field][v] = nextRelsObj[field][v].filter(id => itemsToDeleteHash[id] === undefined);
            }
        });
        return {
            list: archive.list.filter(id => itemsToDeleteHash[id] === undefined),
            data: dataWithoutItems,
            rels: nextRelsObj,
            _meta: archive._meta
        }
    },
    DeleteByFilter(archive, filter) {
        let { _meta: { rels } } = archive;
        let survivorsIds = archive.list.filter(id => !filter(archive.data[id]));
        let survivorsHash = {};
        survivorsIds.forEach(id => survivorsHash[id] = archive.data[id]);
        let nextRelsObj = {};
        rels.forEach(field => {
            nextRelsObj[field] = Object.assign({}, archive.rels[field]);
            for (let v in nextRelsObj[field]) {
                nextRelsObj[field][v] = nextRelsObj[field][v].filter(id => survivorsHash[id] !== undefined);
            }
        });
        return {
            ...archive,
            list: survivorsIds,
            data: survivorsHash,
            rels: nextRelsObj
        }
    },
    All(archive) {
        return archive.list.map(id => archive.data[id]);
    },
    Extract(archive, rel, value) {
        if (archive.rels[rel][value] === undefined) return [];
        return archive.rels[rel][value].map(id => archive.data[id]);
    },
    ExtractNot(archive, rel, value) {
        let all = archive.list;
        let banned = [];
        if (archive.rels[rel][value] !== undefined) banned = archive.rels[rel][value];
        let bannedHash = {};
        banned.forEach(id => bannedHash[id] = true);
        return all.filter(id => !bannedHash[id]).map(id => archive.data[id]);
    },
    Get(archive, itemId) {
        return archive.data[itemId];
    },
    Count(archive) {
        return archive.list.length;
    },
    CountRel(archive, rel, value) {
        if (!archive.rels[rel][value]) return 0;
        return archive.rels[rel][value].length;
    }
}

export default DataArchive;