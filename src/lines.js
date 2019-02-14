import Ractive from 'ractive'

import "./lines.css"

// TODO: setup recursive construction. :D
const Lines = Ractive.extend({
	template: "",
	data: function() {
		return {
			root: true,	
			count: 100,
			style: "",
		};
	},
	onrender: function() {
		var e, l;
		var c = this.get("count");

		if(c > 1) {
			c--;
			e = document.createElement("div");
			e.id = "line-" + c;
			e.className = "line";
			e.style.background = "hsl(" + (3.6 * c % 360) + ", 80%, 50%)";
			e.style.height = 0.5 * c + "px";
			this.el.appendChild(e);
			l = new Lines({el: e.id, data: {count: c, root: false}});
		}
	},
	oncomplete: function() {
		var c = this.get("count");
		var root = this.get("root");

		if(c > 0 && !root) {
			var a = 0;
			var r = 360 / c;

			setTimeout(() => {
				setInterval(() => {
					a = Math.floor(a + -1 * r + 2 * r * Math.random()) % 360;
					this.el.style.transform = "rotate(" + a + "deg)";
				}, 1000);
			}, 3000);
		}
	}
})

export default Lines
