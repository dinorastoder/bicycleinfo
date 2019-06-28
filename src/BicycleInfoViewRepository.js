let BicycleId = require("./BicycleId");

class BicycleInfoViewRepository {
    constructor() {
        throw new Error("Not support");
    }

    static find(bicycleId){
        if (typeof bicycleId !== "object") {
            throw new Error("Wrong type of paramether");
        }

        return BicycleInfoViewRepository.store[bicycleId.bicycleId] || Object.assign({}, BicycleInfoViewRepository.store.new, BicycleInfoViewRepository.store[bicycleId.bicycleId], {id: bicycleId.bicycleId, status: "not_exist"});
    }

    static applyUpdate(payload){
        var bicycle = BicycleInfoViewRepository.find(new BicycleId(payload.bicycleId));

        bicycle[payload.name] = payload.value;
        if (bicycle.status === "not_exist") {
            bicycle.added = new Date();
            bicycle.status = "active";
        }
        bicycle.updated = new Date();
        BicycleInfoViewRepository.store[payload.bicycleId] = bicycle;
    }
}

BicycleInfoViewRepository.store = {
    "xyz-123": {
        "id": "xyz-123",
        "bikeType": "Road Bike",
        "size": "45 cm",
        "color": "black",
        "condition": "",
        "images": [
            {"url": "/images/1.png"},
            {"url": "/images/2.jpg"},
            {"url": "/images/3.jpg"},
            {"url": "/images/4.png"}
        ],
        "notes": "Front brake is not working. John's project for Røde Kors",
        "added": new Date('2019-05-16T19:24:00'), 
        "updated": new Date('2019-05-16T19:24:00'), 
        "status": "active"
    },
    "new": {
        "id": "",
        "bikeType": "",
        "size": "",
        "color": "",
        "condition": "",
        "images": [],
        "notes": "",
        "added": null, 
        "updated": null, 
        "status": "not_exist"
    }
};

module.exports = BicycleInfoViewRepository;
