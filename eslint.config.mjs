import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'

export default [
  ...nextVitals,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'import/no-anonymous-default-export': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ]
    }
  },
  prettier,
  {
    ignores: ['src/app/(payload)/**', 'src/payload/migrations/**/*']
  }
]
