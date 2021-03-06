# volto-customer-satisfaction

Volto addon for customer satisfaction.

Install with mrs-developer (see [Volto docs](https://docs.voltocms.com/customizing/add-ons/)) or with:

```bash
yarn add volto-customer-satisfaction
```

Created with [voltocli](https://github.com/nzambello/voltocli).

## Usage

This addons exports CustomerSatisfaction component that could be added in your site pages to get feedback from users on the usefulness of the page.
It needs https://github.com/RegioneER/rer.customersatisfaction this Plone addon to work.

It also need a RAZZLE_RECAPTCHA_KEY in your .env to work.

```jsx
import {CustomerSatisfaction} from 'volto-customer-satisfaction';

...
<CustomerSatisfaction/>
...
```

<img alt="Form customer satisfaction" src="./docs/form-customer-satisfaction.png" width="600" />

When user click on 'Yes' or 'No' button a textarea is shown to leave a comment or suggestion:

<img alt="Form customer satisfaction open" src="./docs/form-customer-satisfaction-open.png" width="600" />

## Panel

This addon also adds a button to the toolbar to access customer satisfaction panel:

<img alt="Toolbar button" src="./docs/toolbar-panel-button.png" width="50px" />

Into the panel, you can view a summary of customer satisfaction feedbacks and leaved comments:

<img alt="Customer satisfaction panel" src="./docs/panel.png" width="600" />

Comments are shown in a modal and are filterable:
<img alt="Customer satisfaction panel" src="./docs/comments.png" width="600" />
