// Types for validation infrastructure
type RuleName = 'required' | 'requiredIf' | 'minLength' | 'maxLength' | 'greaterThanDate' | 'email' | 'match';

type RuleMessages = Partial<Record<RuleName, string>>;

type ValidationRules = {
    required?: boolean;
    requiredIf?: unknown; // value that dependentField.value must equal for requirement to apply
    minLength?: number;
    maxLength?: number;
    greaterThanDate?: string | Date;
    email?: boolean;
    match?: string | null;
    messages?: RuleMessages;
};

type DependentField = { name: string; value: unknown } | undefined;

type ValidationField = {
    name: string;
    value: unknown;
    rules: ValidationRules;
    dependentField?: DependentField;
    messages?: RuleMessages;
};

type ValidationResults = Record<string, string[]>;

export default function validateFields(fields: ValidationField[]): ValidationResults {
    const results: ValidationResults = {};

    fields.forEach(({ name, value, rules, dependentField, messages }) => {
        const errors: string[] = [];

        // Loop through the rules
        for (const [rule, ruleValue] of Object.entries(rules)) {
            switch (rule as RuleName) {
                case 'required':
                    if (
                        ruleValue &&
                        (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value)))
                    ) {
                        errors.push(rules.messages?.required || `${name} is required.`);
                    }
                    break;

                case 'requiredIf':
                    // Check if the dependent field meets the condition
                    if (ruleValue && dependentField && (dependentField as { value: unknown }).value === ruleValue) {
                        if (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) {
                            errors.push(rules.messages?.requiredIf || `${name} is required when ${dependentField.name} is ${ruleValue}.`);
                        }
                    }
                    break;

                case 'minLength':
                    if (typeof ruleValue === 'number') {
                        const len = typeof value === 'string' || Array.isArray(value) ? (value as string | unknown[]).length : 0;
                        if (len < ruleValue) {
                            errors.push(
                                rules.messages?.minLength ||
                                `${name} must be at least ${ruleValue} characters long.`
                            );
                        }
                    }
                    break;

                case 'maxLength':
                    if (typeof ruleValue === 'number') {
                        const len = typeof value === 'string' || Array.isArray(value) ? (value as string | unknown[]).length : 0;
                        if (len > ruleValue) {
                            errors.push(
                                rules.messages?.maxLength ||
                                `${name} must not exceed ${ruleValue} characters.`
                            );
                        }
                    }
                    break;

                case 'greaterThanDate':
                    {
                        const comparisonDate = new Date(ruleValue as string | Date);
                        const inputDate = new Date(value as string | Date);
                        const inputInvalid = isNaN(inputDate.getTime());
                        const compareInvalid = isNaN(comparisonDate.getTime());
                        if (inputInvalid || compareInvalid || inputDate <= comparisonDate) {
                            errors.push(
                                rules.messages?.greaterThanDate ||
                                `${name} must be a date greater than ${ruleValue}.`
                            );
                        }
                    }
                    break;

                case 'email':
                    {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const stringValue = typeof value === 'string' ? value : '';
                        if (!emailRegex.test(stringValue)) {
                            errors.push(
                                rules.messages?.email ||
                                `${name} must be a valid email`
                            );
                        }
                    }
                    break;
                case 'match':
                    if (ruleValue !== null && value !== ruleValue) {
                        errors.push(
                            messages?.match ||
                            `${name} must match ${ruleValue}.`
                        );
                    }
                    break;
                default:
                    break;
            }
        }

        // Store the result for this field
        if (errors.length) {
            results[name] = errors;
        }
    });

    return results;
}