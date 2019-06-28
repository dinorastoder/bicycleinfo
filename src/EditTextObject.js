class EditTextObject {
    constructor(bicycleInfoView, field) {
        this.id = bicycleInfoView.id;
        this.status = bicycleInfoView.status;
        this.value = bicycleInfoView[field.name];
        this.name = field.name
        this.fieldType = field.type
        this.fieldValues = field.getValues();
    }
}

module.exports= EditTextObject;
