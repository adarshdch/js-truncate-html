let JSTruncateHtml = function(options) {
	
	options = options || {};
    //options.nodes = options.nodes || {};

	return {

		truncate: function(inputHtmlContent, expectedLength) {

			let stack = [];
			let output = '';
			let outputLength = 0;
			let exit = false;

			let htmlContent =  this.decodeHtml(inputHtmlContent);
			//expectedLength += htmlContent.

			while (expectedLength > outputLength && exit == false) {
		    	let tagStartIndex = htmlContent.indexOf('<');

		    	//If no further html tags are found slice and return remaining required string
		    	if (tagStartIndex < 0) {
		    		output += this.encodeHtml(htmlContent.slice(0, expectedLength - outputLength));
		    		break;
		    	}
				
				//Extract normal content before tag
				let fragment = htmlContent.slice(0, tagStartIndex);

				//Append fragment to output
				let fragmentLength = fragment.length;
				let requiredContentLength = expectedLength - outputLength;
				


				let outputFragment = fragment.slice(0, requiredContentLength);
				output = output + this.encodeHtml(outputFragment);
				outputLength += outputFragment.length;

				//Break if no tag found or expected length output found 
				if (tagStartIndex < 0 || expectedLength <= outputLength) {
					while(stack.length > 0) {
						output = output + '</' + stack.pop() + '>';
					}

					break;
				}

				//Store tag in stack
				let tagEndIndex = htmlContent.indexOf('>');

				//Append tag in output
				let tagFragment = htmlContent.slice(tagStartIndex, tagEndIndex + 1)
				output += tagFragment;

				if (tagFragment.indexOf('/') > -1) {

				} else {
					//Store tags to be closed at the end
					let tag = tagFragment.slice(1, tagFragment.indexOf(' '));
					stack.push(tag);
				}

				htmlContent = htmlContent.slice(tagEndIndex + 1);
			}

			return output;
		},

		decodeHtml: function (encodedHtml) {
			let virualDOM = document.createElement("textarea");
			virualDOM.innerHTML = encodedHtml;
			return virualDOM.value;
		},

		encodeHtml: function (decodeHtml) {
			let virtualDOM = document.createElement("div");
			return virtualDOM.appendChild(document.createTextNode(decodeHtml)).parentNode.innerHTML;
		},

		

	};
}

if(typeof(module) !== 'undefined')
	module.exports = JSTruncateHtml;