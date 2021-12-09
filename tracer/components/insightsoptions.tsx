import styled from 'styled-components';
import { useAppSelector } from '../state/hooks';
import { createContext, useState } from 'react'; // NEED TO SET STATE ON INSIGHTS COMPONENT(?)
import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Radio,
  RadioGroup
} from '@chakra-ui/react'

interface selectedOptionsInterface {
  'OPTION1': number,
  'OPTION2': number,
  'OPTION3': number,
}


const insightsoptions = ({ /* selectedOptions: selectedOptionsInterface, */ setSelectedOptions }) => {
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const selectedOptions: selectedOptionsInterface = {
    'OPTION1': 1,
    'OPTION2': 2,
    'OPTION3': 3,
  }

  const optionsList = [
    ['TQF', 'Top Query by Frequency'],
    ['AQD', 'Average Query Duration'],
    ['TOF', 'Top Operations by Frequency'],
    ['AOD', 'Average Operation Duration'],
    ['TFA', 'Top Frequency of All'],
    ['ADA', 'Average Duration of All']
  ];

  // declare constant for currently currently selected options
  const currOptionsArray: string[] = Object.keys(selectedOptions);

  const maxAllowedOptions: number = 3;

  // limiting checkbox options to max allowed number of options
  const isDisabled = (val: string): boolean => {
    return currOptionsArray.length >= maxAllowedOptions && currOptionsArray.indexOf(val) == -1;
  }

  // updates state based on options selected
  const handleOptionsToggle = (val: string) => {
    if (selectedOptions[val] === undefined) {
      selectedOptions[val] = 1;
    } else {
      delete selectedOptions[val];
    }
    setSelectedOptions({ ...selectedOptions });
    console.log('selectedOptions: ', selectedOptions)
  }

  // generate checkboxes for options
  const checkBoxes = optionsList.map(option => {
    <Checkbox
      value={option[0]}
      isDisabled={isDisabled('TQF')}
      // isChecked={selectedOptions.indexOf('TQF') !== -1}
      onChange={e => handleOptionsToggle(e.target.value)}>{option[1]}
    </Checkbox>
  })

  // updates options state based on number selected
  const handleNumberToggle = (option: string, val: number) => {
    selectedOptions[option] = val;
    setSelectedOptions({ ...selectedOptions });
  }

  // dynamically generate numbered radio buttons for selected options
  const numberedRadioButtons = currOptionsArray.map(option => {
    return (
      <>
        <p>{option}</p>
        <RadioGroup onChange={e => handleNumberToggle(option, e.target.value)} value={value}>
          <Stack spacing={4} direction='row'>
            <Radio value='1'>1</Radio>
            <Radio value='3'>3</Radio>
            <Radio value='5'>5</Radio>
          </Stack>
        </RadioGroup>
      </>
    )
  })

  // options should let users choose maximum of three graphs to show
  // next to graphs to show, specify optionNumbers

  return (
    <>
      <CheckboxGroup colorScheme='green' defaultValue={[]}>
        <Stack>
          {...checkBoxes}
        </Stack>
      </CheckboxGroup>
      <div className="radio-button-wrapper">
        {...numberedRadioButtons}
      </div>
    </>
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

// *****    HARDCODED CHECKBOXES BACKUP     ******
{/* <Checkbox
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
  onChange={(e) => handleToggle(e.target.value)}>Average Duration of All</Checkbox> */}

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