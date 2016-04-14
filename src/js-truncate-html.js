let JSTruncateHtml = function(options) {
	
	options = options || {};
    //options.nodes = options.nodes || {};

	return {

		truncate: function(htmlContent, expectedLength) {

			let stack = [];
			let output = '';
			let tempDOM = document.createElement('textarea');
			let outputLength = 0;
			let exit = false;

			tempDOM.innerHTML = htmlContent;
			let encodedHtmlContent =  htmlContent;
			//expectedLength += htmlContent.

			while (expectedLength > outputLength && exit == false) {
		    	let tagStartIndex = encodedHtmlContent.indexOf('<');

		    	//If no further html tags are found slice and return remaining required string
		    	if (tagStartIndex < 0) {
		    		output += encodedHtmlContent.slice(0, expectedLength - outputLength);
		    		break;
		    	}
				
				//Extract normal content before tag
				let fragment = encodedHtmlContent.slice(0, tagStartIndex);

				//Append fragment to output
				let fragmentLength = fragment.length;
				let requiredContentLength = expectedLength - outputLength;
				let outputFragment = fragment.slice(0, requiredContentLength);
				output = output + outputFragment;
				outputLength += outputFragment.length;

				//Break if no tag found or expected length output found 
				if (tagStartIndex < 0 || expectedLength <= outputLength) {
					while(stack.length > 0) {
						output = output + '</' + stack.pop() + '>';
					}

					break;
				}

				//Store tag in stack
				let tagEndIndex = encodedHtmlContent.indexOf('>');

				//Append tag in output
				let tagFragment = encodedHtmlContent.slice(tagStartIndex, tagEndIndex + 1)
				output += tagFragment;

				if (tagFragment.indexOf('/') > -1) {

				} else {
					//Store tags to be closed at the end
					let tag = tagFragment.slice(1, tagFragment.indexOf(' '));
					stack.push(tag);
				}


				encodedHtmlContent = encodedHtmlContent.slice(tagEndIndex + 1);
				

			}

			return output;
			tempDOM.innerHTML = '';
			return tempDOM.appendChild(document.createTextNode(output)).parentNode.innerHTML;
		}

		

	};
}

if(typeof(module) !== 'undefined')
	module.exports = JSTruncateHtml;