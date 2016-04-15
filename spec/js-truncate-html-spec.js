var htmlContentWithExpectedData = {
	stringData: [
		{
			description: 'should return empty for -ve length',
			originalHtmlContent: 'It does not have any html tag.',
			expectedLength: -1,
			expectedHtmlContent: ''
		},
		{
			description: 'should do normal text truncation',
			originalHtmlContent: 'It does not have any html tag.',
			expectedLength: 15,
			expectedHtmlContent: 'It does not hav'
		},
		{
			description: 'should do normal text truncation - handle escape characters',
			originalHtmlContent: 'It doesn\'t have any html tag.',
			expectedLength: 18,
			expectedHtmlContent: 'It doesn\'t have an'
		},
		{
			description: 'should do normal text truncation - handle html encoded characters',
			originalHtmlContent: 'It does &amp; not have any html tag.',
			expectedLength: 17,
			expectedHtmlContent: 'It does &amp; not hav'
		},
		{
			description: 'should do normal text truncation - handle html encoded characters',
			originalHtmlContent: 'It does & not have any html tag.',
			expectedLength: 22,
			expectedHtmlContent: 'It does &amp; not have any'
		},
		{
			description: 'should do normal text truncation - return full content',
			originalHtmlContent: 'It does not have any html tag.',
			expectedLength: 30,
			expectedHtmlContent: 'It does not have any html tag.'
		},
		{
			description: 'should do normal text truncation - return full content',
			originalHtmlContent: 'It does not have any html tag.',
			expectedLength: 50,
			expectedHtmlContent: 'It does not have any html tag.'
		}
	],
	htmlData: [
		{
			description: 'should have opening and closing bold tag',
			originalHtmlContent: '<b>Hello World !!!</b>',
			expectedLength: 13,
			expectedHtmlContent: '<b>Hello World !</b>'
		},
		{
			description: 'should have closing bold tag',
			originalHtmlContent: 'Hello <b>World !!!</b>',
			expectedLength: 13,
			expectedHtmlContent: 'Hello <b>World !</b>'
		},
		{
			description: 'should have closing p tag',
			originalHtmlContent: 'This is <p>paragrapth</p>',
			expectedLength: 12,
			expectedHtmlContent: 'This is <p>para</p>'
		},
		{
			description: 'should have <br/> tag present',
			originalHtmlContent: 'This is <br/> new line and <p>paragraph</p>',
			expectedLength: 26,
			expectedHtmlContent: 'This is <br/> new line and <p>para</p>'
		},
		{
			description: 'should have <br/> tag present - support space in tags',
			originalHtmlContent: 'This is <br   /> new line and <p>paragraph</p>',
			expectedLength: 26,
			expectedHtmlContent: 'This is <br   /> new line and <p>para</p>'
		},
		{
			description: 'should truncte nested html',
			originalHtmlContent: 'This <div>div has  <p><b>bold</b> paragraph</p></div>',
			expectedLength: 23,
			expectedHtmlContent: 'This <div>div has  <p><b>bold</b> para</p></div>'
		},
		{
			description: 'should truncte multiple nested html',
			originalHtmlContent: 'This <div>div has  <p><b>bold</b> paragraph</p></div><div>another div</div>',
			expectedLength: 39,
			expectedHtmlContent: 'This <div>div has  <p><b>bold</b> paragraph</p></div><div>another div</div>'
		}
	]
};


describe("Test if required methods are defined", function() {

  	it("should define JsTruncateHtml", function() {
    	expect(JsTruncateHtml).toBeDefined();
  	});

  	var truncater = new JsTruncateHtml({});

  	it("should be able to create object of JsTruncateHtml", function() {
    	expect(truncater).toBeDefined();
  	});

  	it("should define truncate", function() {
    	expect(truncater.truncate).toBeDefined();
  	});
});


describe("Test if truncation is working as expected for normal string", function() {

	describe("Test includeElipsis: false", function(){
		let truncater = new JsTruncateHtml({includeElipsis: false});
		let stringData = htmlContentWithExpectedData.stringData;

		for (let index = 0; index < stringData.length; index++) {
			let testData = stringData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength)).
		    	toEqual(testData.expectedHtmlContent);
	  		});
		}		
	});

	describe("Test includeElipsis: true", function(){
		let truncater = new JsTruncateHtml({includeElipsis: true});
		let stringData = htmlContentWithExpectedData.stringData;

		for (let index = 0; index < stringData.length; index++) {
			let testData = stringData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent + '...');
	  		});
		}		
	});

	describe("Test elipsisCharacter: '-'", function(){
		let truncater = new JsTruncateHtml({includeElipsis: true, elipsisCharacter: '-'});
		let stringData = htmlContentWithExpectedData.stringData;

		for (let index = 0; index < stringData.length; index++) {
			let testData = stringData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent + '---');
	  		});
		}		
	});

	describe("Test elipsisLength: '-'", function(){
		let truncater = new JsTruncateHtml({includeElipsis: true, elipsisLength: 5, elipsisCharacter: '-'});
		let stringData = htmlContentWithExpectedData.stringData;

		for (let index = 0; index < stringData.length; index++) {
			let testData = stringData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent + '-----');
	  		});
		}		
	});

});

describe("Test if truncation is working as expected for html content", function() {

	describe("Test includeElipsis: false", function(){
		let truncater = new JsTruncateHtml({includeElipsis: false});
		let htmlData = htmlContentWithExpectedData.htmlData;

		for (let index = 0; index < htmlData.length; index++) {
			let testData = htmlData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent);
	  		});
		}
	});

	describe("Test includeElipsis: true", function(){
		let truncater = new JsTruncateHtml({includeElipsis: true});
		let htmlData = htmlContentWithExpectedData.htmlData;

		for (let index = 0; index < htmlData.length; index++) {
			let testData = htmlData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent + '...');
	  		});
		}
	});

	describe("Test elipsisCharacter: '-'", function(){
		let truncater = new JsTruncateHtml({includeElipsis: true, elipsisCharacter: '-'});
		let htmlData = htmlContentWithExpectedData.htmlData;

		for (let index = 0; index < htmlData.length; index++) {
			let testData = htmlData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent + '---');
	  		});
		}		
	});

	describe("Test elipsisLength: '-'", function(){
		let truncater = new JsTruncateHtml({includeElipsis: true, elipsisLength: 5, elipsisCharacter: '-'});
		let htmlData = htmlContentWithExpectedData.htmlData;

		for (let index = 0; index < htmlData.length; index++) {
			let testData = htmlData[index];
		
			it(testData.description, function() {
		    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength))
		    	.toEqual(testData.expectedHtmlContent + '-----');
	  		});
		}		
	});

});