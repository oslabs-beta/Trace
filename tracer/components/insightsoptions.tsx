import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createContext, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  CheckboxGroup,
  Stack
} from '@chakra-ui/react'


const insightsoptions = () => {
  // const [selectedOptions, setSelectedOptions] = useState({
  //   TQF: false,
  //   AQD: false,
  //   TOF: false,
  //   AOD: false,
  //   TFA: false,
  //   ADA: false
  // });

  // const toggleSelected = (selected: string) => {
  //   setSelectedOptions({
  //     ...selectedOptions,
  //     selected: !selectedOptions[selected]
  //   })
  // }

  // interface Options {
  //   render: boolean;
  //   id: number[];
  // }

  // const options: Options = createContext({
  //   TQF: {
  //     render: false,
  //     list: optionNumbers
  //   },
  //   AQD: {
  //     render: false,
  //     list: optionNumbers
  //   },
  //   TOF: {
  //     render: false,
  //     list: optionNumbers
  //   },
  //   AOD: {
  //     render: false,
  //     list: optionNumbers
  //   },
  //   TFA: {
  //     render: false,
  //     list: optionNumbers
  //   },
  //   ADA: {
  //     render: false,
  //     list: optionNumbers
  //   }
  // })

  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectMax = 3;

  const isDisabled = (val: string): boolean => {
    return selectedOptions.length > 2 && selectedOptions.indexOf(val) == -1;
  }

  const handleToggle = (val: string) => {
    const valIndex = selectedOptions.indexOf(val);
    const newSelected = [...selectedOptions];

    if (valIndex === -1) {
      newSelected.push(val);
    } else {
      newSelected.splice(valIndex, 1);
    }

    setSelectedOptions(newSelected);
    console.log('selectedOptions: ', selectedOptions)
  }

  // options should let users choose maximum of three graphs to show
  // next to graphs to show, specify optionNumbers

  return (
    <>
      <CheckboxGroup colorScheme='green' defaultValue={[]}>
        <Stack>
          <Checkbox
            value='TQF'
            isDisabled={isDisabled('TQF')}
            // isChecked={selectedOptions.indexOf('TQF') !== -1}
            onChange={(e) => handleToggle(e.target.value)}>Top Query by Frequency</Checkbox>
          <Checkbox
            value='AQD'
            isDisabled={isDisabled('AQD')}
            // isChecked={selectedOptions.indexOf('AQD') !== -1}
            onChange={(e) => handleToggle(e.target.value)}>Average Query Duration</Checkbox>
          <Checkbox
            value='TOF'
            isDisabled={isDisabled('TOF')}
            // isChecked={selectedOptions.indexOf('TOF') !== -1}
            onChange={(e) => handleToggle(e.target.value)}>Top Operations by Frequency</Checkbox>
          <Checkbox
            value='AOD'
            isDisabled={isDisabled('AOD')}
            // isChecked={selectedOptions.indexOf('AOD') !== -1}
            onChange={(e) => handleToggle(e.target.value)}>Average Operation Duration</Checkbox>
          <Checkbox
            value='TFA'
            isDisabled={isDisabled('TFA')}
            // isChecked={selectedOptions.indexOf('TFA') !== -1}
            onChange={(e) => handleToggle(e.target.value)}>Top Frequency of All</Checkbox>
          <Checkbox
            value='ADA'
            isDisabled={isDisabled('ADA')}
            // isChecked={selectedOptions.indexOf('ADA') !== -1}
            onChange={(e) => handleToggle(e.target.value)}>Average Duration of All</Checkbox>
        </Stack>
      </CheckboxGroup>
    </>
    // </*CheckBoxComponent */Checkbox
    //   checked={selectedOptions.indexOf(this.value) !== -1}
    //   tabIndex={-1}
    //   disabled={isDisabled(this.value)}
    // />
  )

}

export default insightsoptions;
/*
    Insights:
    Top Query by Frequency: TQF
    Average Query Duration: AQD
    Top Operations by Frequency: TOF
    Average Operation Duration: AOD
    Top Frequency of All: TFA
    Average Duration of All: ADA
*/

/*

  I WANT TO:
  Create a component that renders up to three divs.

  The main component will be a CSS Grid container
  layed out with two columns and 5 or 7 rows.

  The insights boxes will each span two rows
  (with the leftover row being reserved to make
  space for the header and options div.)

  Then, we will read the context object from options to decide what we're rendering.

  * We can render up to 3 boxes at a time *

  At the top of the Box we will display the name of the insight along
  with how many queries are displayed.
  e.g. `Top ${num} Resolver durations` or `Top ${num} Operations by frequency`

  The rest of the Box will simply display the metrics and a graph,
  with an overflow scroll bar for longer insights.

*/

/*
context = {
  TQF: {
    render: Boolean,
    list: integer(default 5);
  },
  AQD: {
    render: Boolean,
    list: integer(default 5);
  },
  ...others
}
*/

