class Field {
    constructor(fieldName) {
        this.name = fieldName;
        this.type = Field.filedType[fieldName] || "NA";
    }

    getValues() {
        return Field.values[this.name] || [];
    }
}

Field.filedType = {
    notes: "text",
    condition: "select",
    color: "select"
};

Field.values = {
    condition: [{
        value: "notChecked",
        display: "Not Checked"
    },{
        value: "nonWorking",
        display: "Not Working"
    }]
}

module.exports= Field;
