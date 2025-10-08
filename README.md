# openui5-input-validation-error
Example repo to demo the input validation behaviour when bound to an oData V4 service.

This example uses a **CAP** backend since the Mock server still doesn't support OData V4.

So, the example has to start from the CAP application.

## Installation

On the root folder just run `nmp install`

## Start the application

On the root folder run `cds watch`.

It will open a page on the port `4004` where the link to the webapp can be found.

![Screenshot of the cds Welcome page.](/imgs/webapp-link.png "Screenshot of the cds Welcome page")

## Bug Description

The bug happens when the user enters an invalid value in a field, for instance a numeric field that allows values in a range. In this example the Price is valid only for values between 1 and 300. In case of error, the backend (CAP serving a OData V4 service) will return the standard error and the frontend will updates the status of the input automatically. 

However, when the user updates the values after an error, even if the backend returns an updated message, the UI will display the old message and the input will stay in error even if the entered value is valid and the backend responds with a 200.

## Reproducing the bug

1. Click the only item in the table to navigate to the form.
![Step 1](/imgs/step-1.png "Screenshot of the step 1")
 The detail page will be shown.
![Step 1](/imgs/step-1-result.png "Screenshot of the step 1")
2. Edit the `price` field to be invalid e.g. -1. The input will go in status error and the error message sent by the backend will be displayed.
![Step 2](/imgs/step-2.png "Screenshot of the step 2")
3. Edit the `price`field to be still invalid e.g. 800. The input will stay in status error but the displayed error message won't update.
![Step 3](/imgs/step-3.png "Screenshot of the step 3")
4. Edit the `price` field again but this time to be valid e.g. 200. Even if the backend responds 200 Ok. The input stays in status error and the first error message is still visible.
![Step 4](/imgs/step-4.png "Screenshot of the step 4")


## Workaround

The problem seems to be that the first error message for the Price field is never removed from the `MessageManeger`. However, to clear it up in the application code the developer should attach to the PatchSend [event](https://sapui5.hana.ondemand.com/sdk/?utm_source=chatgpt.com#/api/sap.ui.model.odata.v4.ODataContextBinding%23events/patchSent) and remove the error messages targetting the field.

Resulting in a similar code:
```
oContextBinding.attachPatchSent(() => {
     // Check if value is valid by seeing if backend returned a message
     const aMessages = oMessageManager.getMessageModel().getData();
     const sTarget = oContext.getPath() + "/price";

     // Remove any stale messages for this property
     const aToRemove = aMessages.filter((msg) => msg.target === sTarget);
     if (aToRemove.length > 0) {
       oMessageManager.removeMessages(aToRemove);
     }
});
```

