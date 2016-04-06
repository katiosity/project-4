var mongoose = require("mongoose");

var PlaceSchema = mongoose.Schema({
	name: String,
	address: String,
	reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
});

PlaceSchema.set("toJSON", {
	transform: function(doc, ret, options) {
		var returnJson = {
			id: ret._id,
			name: name,
			address: address
		};
		return returnJson;
	}
});

PlaceSchema.pre("save", function(next) {
	var place = this;
	next();
});

module.exports = mongoose.model("Place", PlaceSchema);