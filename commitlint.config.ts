import {UserConfig} from '@commitlint/types'; 
import {RuleConfigSeverity} from '@commitlint/types'; 
const ret:UserConfig= {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'msg-rule': [RuleConfigSeverity.Error, 'always'],
        'subject-empty':[RuleConfigSeverity.Disabled, 'never'],
        'type-empty':[RuleConfigSeverity.Disabled, 'never'],
    },
    
    plugins: [
        {
            rules: {
                'msg-rule': (subject) => {
                    const ret=/^(general|web|server):.*/.test(subject.header)
                    return [
                        ret,
                        `Your subject should contain start with 'general|web|server'`,
                    ];
                },
            },
        },
    ],
};
export default ret