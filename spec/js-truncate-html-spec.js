var htmlContentWithExpectedData = {
	stringData: [
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
		},/*
		{
			description: 'should do normal text truncation - handle html encoded characters',
			originalHtmlContent: 'It does &amp; not have any html tag.',
			expectedLength: 17,
			expectedHtmlContent: 'It does &amp; not hav'
		},*/
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
			description: 'should have <br/> tag present',
			originalHtmlContent: 'This is <br/> new line and <p>paragraph</p>',
			expectedLength: 26,
			expectedHtmlContent: 'This is <br/> new line and <p>para</p>'
		}
	]
};


describe("Test if required methods are defined", function() {

  	it("should define JSTruncateHtml", function() {
    	expect(JSTruncateHtml).toBeDefined();
  	});

  	var truncater = new JSTruncateHtml({});

  	it("should be able create object of JSTruncateHtml", function() {
    	expect(truncater).toBeDefined();
  	});

  	it("should define truncate", function() {
    	expect(truncater.truncate).toBeDefined();
  	});
});


describe("Test if truncation is working as expected for normal string", function() {

	let truncater = new JSTruncateHtml({});
	let stringData = htmlContentWithExpectedData.stringData;

	for (let index = 0; index < stringData.length; index++) {
		let testData = stringData[index];
	
		it(testData.description, function() {
	    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength)).toEqual(testData.expectedHtmlContent);
  		});
	}

});

describe("Test if truncation is working as expected for html content", function() {

	let truncater = new JSTruncateHtml({});
	let htmlData = htmlContentWithExpectedData.htmlData;

	for (let index = 0; index < htmlData.length; index++) {
		let testData = htmlData[index];
	
		it(testData.description, function() {
	    	expect(truncater.truncate(testData.originalHtmlContent, testData.expectedLength)).toEqual(testData.expectedHtmlContent);
  		});
	}

});