'use babel';

// notice data is not being loaded from a local json file
// instead we will fetch suggestions from this URL

//const API_URL = 'http://127.0.0.1:5000/';
//const API_URL = 'http://localhost:3000/api';
const API_URL = 'http://desolate-escarpment-53919.herokuapp.com/api';

class AdvancedProvider {
	constructor() {
		// offer suggestions only when editing plain text or HTML files
		this.selector = '.text.plain, .text.html.basic';

		// except when editing a comment within an HTML file
		this.disableForSelector = '.text.html.basic .comment';

		// make these suggestions appear above default suggestions
		this.suggestionPriority = 2;
	}

	getSuggestions(options) {
		const { editor, bufferPosition } = options;

		// getting the prefix on our own instead of using the one Atom provides
		let prefix = this.getPrefix(editor, bufferPosition);
    let word = this.getwordprefix(editor, bufferPosition);

		// all of our snippets start with "@"
		if (prefix.length > 20) {
			//prefix = prefix.slice(0, -1);
		if (word.length < 1) {
		return this.findMatchingSuggestions(prefix);
	}
		}
	}

	getwordprefix(editor, bufferPosition) {
		// the prefix normally only includes characters back to the last word break
		// which is problematic if your suggestions include punctuation (like "@")
		// this expands the prefix back until a whitespace character is met
		// you can tweak this logic/regex to suit your needs
		let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		line = line.split(" ");
		line = line[line.length - 1];
		console.log(line);
		return line;
	}

	getPrefix(editor, bufferPosition) {
		// the prefix normally only includes characters back to the last word break
		// which is problematic if your suggestions include punctuation (like "@")
		// this expands the prefix back until a whitespace character is met
		// you can tweak this logic/regex to suit your needs
		let line = editor.getTextInRange([[0, 0], bufferPosition]);
		console.log(line)
		line = line.split(" ");
		line = line.slice(Math.max(line.length - 10, 0));
		line = line.join(' ');
		//console.log(line);
		return line;
	}

	findMatchingSuggestions(prefix) {
		// using a Promise lets you fetch and return suggestions asynchronously
		// this is useful for hitting an external API without causing Atom to freeze
		return new Promise((resolve) => {
			// fire off an async request to the external API
			fetch(API_URL+'?query='+prefix+"+&format=Machine")
				.then((response) => {
					// convert raw response data to json
					return response.json();
				})
				.then((json) => {
					// filter json (list of suggestions) to those matching the prefix
					let matchingSuggestions = json.filter((suggestion) => {
						return suggestion;
					});

					// bind a version of inflateSuggestion() that always passes in prefix
					// then run each matching suggestion through the bound inflateSuggestion()
					let inflateSuggestion = this.inflateSuggestion.bind(this, prefix);
					let inflatedSuggestions = matchingSuggestions.map(inflateSuggestion);

					// resolve the promise to show suggestions
					resolve(inflatedSuggestions);
					console.log(inflatedSuggestions);
				})
				.catch((err) => {
					// something went wrong
					console.log(err);
				});
		});
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(replacementPrefix, suggestion) {
		replacementPrefix = ' ';
		return {
			displayText: suggestion.displayText,
			snippet: suggestion.snippet,
			description: suggestion.description,
			replacementPrefix: replacementPrefix, // ensures entire prefix is replaced
			iconHTML: '<i class="icon-comment"></i>',
			type: 'snippet',
			rightLabelHTML: '<span class="aab-right-label">Snippet</span>' // look in /styles/atom-slds.less
		};
	}

	onDidInsertSuggestion(options) {
		//atom.notifications.addSuccess(options.suggestion.displayText + ' was inserted.');
	}
}
export default new AdvancedProvider();
