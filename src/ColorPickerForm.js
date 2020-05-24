import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import clsx from 'clsx';

class ColorPickerForm extends Component {
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
            this.props.colors.every(({color}) => color !== this.props.currentColor)
        );
    }

    render() {
        const {classes, paletteFull, currentColor, updateColor, addNewColor, newName, handleNewName} = this.props;
        return (
            <div>
                <ChromePicker className={clsx(classes.picker)} color={currentColor} onChangeComplete={updateColor}/>
                <ValidatorForm onSubmit={addNewColor} ref='form' instantValidate={false}>
                <TextValidator  value={newName} 
                                className={clsx(classes.colorNameInput)}
                                variant='filled'
                                name="newName"
                                placeholder='Color Name'
                                margin='normal'
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
                className={clsx(classes.addColor)}
                >
                {paletteFull ? 'PALETTE FULL' : 'Add Color'}
                </Button>
            </ValidatorForm>
            </div>
        )
    }
}


export default ColorPickerForm;