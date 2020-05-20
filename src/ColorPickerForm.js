import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';

export default class ColorPickerForm extends Component {
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
            this.props.colors.every(({color}) => color !== this.props.currentColor)
        );
    }

    render() {
        const {paletteFull, currentColor, updateColor, addNewColor, newName, handleNewName} = this.props;
        return (
            <div>
                <ChromePicker style={{justifyContent: 'center'}}color={currentColor} onChangeComplete={updateColor}/>
                <ValidatorForm onSubmit={addNewColor}>
                <TextValidator  value={newName} 
                                name="newName"
                                onChange={handleNewName}
                                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                                errorMessages={['Enter a color name!', 'Color name must be unique!', 'Color already used!']}
                />
                <Button 
                variant='contained' 
                style={{backgroundColor: paletteFull ? '#CDCDCD' : currentColor}} 
                color='primary' 
                type='submit'
                disabled={paletteFull}
                >
                {paletteFull ? 'PALETTE FULL' : 'Add Color'}
                </Button>
            </ValidatorForm>
            </div>
        )
    }
}
