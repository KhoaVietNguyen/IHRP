import { Sizes } from '@dungdang/react-native-basic'

const fontSizes = {
    title: Sizes.h30,
    titleSmall: Sizes.h24,
    header:Sizes.h34,
    border: Sizes.s2,
}

const fontColors = {
    blackDefault: 'black',
    title: '#7F8890',
    valueInput: '#222222',

    //border
    border: '#EBEDF0',
    borderError: 'red',
    borderFocused: '#4F8DFE',

    //button
    buttonViewApplication: '#EAF0FE',
    buttonTextAppplication: '#2F6BFE',

    buttonDisableViewApplication: 'gray',
    buttonDisableTextAppplication: 'white',

    requireSubmit:"red"


}

const fontView = {
    border: Sizes.h10,

    paddingHorizontal: Sizes.s30,
    paddingVertical: Sizes.s10,
    paddingVerticalTextInput: Sizes.s15,
    paddingVerticalText: Sizes.s20,
}

export { fontSizes, fontColors, fontView }