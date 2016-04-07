var mongoose = require("mongoose");

var PlaceSchema = mongoose.Schema({
	name: String,
	addressLine1: String,
	addressLine2: String,
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
});

PlaceSchema.set("toJSON", {
	transform: function(doc, ret, options) {
		var returnJson = {
			id: ret._id,
			name: name,
			addressLine1: addressLine1,
			addressLine2: addressLine2
		};
		return returnJson;
	}
});

PlaceSchema.pre("save", function(next) {
	var place = this;
	next();
});

module.exports = mongoose.model("Place", PlaceSchema);