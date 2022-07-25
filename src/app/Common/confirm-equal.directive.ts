import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqual]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualDirective,
    multi: true
  }]
})
export class ConfirmEqualDirective implements Validator {
  // in case we need [ass parameter]
  //@Input("appConfirmEqual") valueToCompare: string = '';

  validate(controlGroup: AbstractControl): ValidationErrors | null {
    let compareValue = controlGroup.get('password');
    let compareToValue = controlGroup.get('confirmPassword');
    if (compareValue && compareToValue && compareValue.value !== compareToValue.value) {
      return { "notEqual": true };
    }
    return null;
  }
}
