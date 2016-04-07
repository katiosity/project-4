var mongoose = require("mongoose");

var ReviewSchema = mongoose.Schema({
	food: Number,
	drinks: Number,
	service: Number,
	atmosphere: Number,
	imageUrl: String,
	imageDescription: String,
	review: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	place: {type: mongoose.Schema.Types.ObjectId, ref: "Place"}
});

ReviewSchema.set("toJSON", {
	transform: function(doc, ret, options) {
		var returnJson = {
			id: ret._id,
			food: ret.food,
			drinks: ret.drinks,
			service: ret.service,
			atmosphere: ret.atmosphere,
			image: ret.image,
			review: ret.review,
			imageUrl: ret.imageUrl,
			imageDescription: ret.imageDescription,
			user: ret.user,
			place: ret.place
		};
		return returnJson;
	}
});

module.exports = mongoose.model("Review", ReviewSchema);