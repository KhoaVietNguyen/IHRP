import { Functions } from '@dungdang/react-native-basic'
const { arrayIsEmpty } = Functions
const selectItemMultiSearch = (itemSelect, dataMultiSearch, dataSelectMulti) => {
    let obj = {
        dataMultiSearch: undefined,
        dataSelectMulti: undefined,
        itemSelect: undefined
    }
    if (!arrayIsEmpty(dataMultiSearch)) {
        let data = dataMultiSearch.map((value) => {
            if (value.id === itemSelect.id) {
                return Object.assign({}, value, { isSelect: !value.isSelect })
            } else {
                return value
            }
        })

        let selects = dataSelectMulti
        let existsItem = dataSelectMulti.filter((value) => {
            return value.id === itemSelect.id
        })
        if (existsItem.length > 0) {
            selects = dataSelectMulti.filter((value) => {
                return value.id !== itemSelect.id
            })
        } else {
            selects.push(Object.assign({}, itemSelect, { isSelect: !itemSelect.isSelect }))
        }
        obj = {
            dataMultiSearch: data,
            dataSelectMulti: selects,
            itemSelect: itemSelect
        }
        return obj
    } else {
        return obj
    }

}
const mapDataToArrayPicker = (type, data) => {
    let arr = []
    if (!arrayIsEmpty(data)) {
        if (type === 'employee') {
            arr = data.map((value) => {
                return {
                    id: value.empID,
                    label: value.item1,
                    isSelect: false,
                    type: 'employee',
                    value: value
                }
            })
        }
    }
    return arr
}

export { selectItemMultiSearch, mapDataToArrayPicker }