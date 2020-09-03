# NotAnAutocompleteAI
(Not) an autocomplete addon for Atom Editor! Install Atom and `git clone` this repository to get started.

## Installation
1. Go to [atom.io](https://atom.io/) and install Atom Editor.
2. Clone this repository.
- You can use Github Desktop
- Alternatively, do 
`git clone https://github.com/wz-ml/NotAnAutocompleteAI.git`.
3. Open terminal/command prompt/shell, navigate to the repo directory, and run `apm link`.
4. Open Atom Editor. After going through setup, you will be able to see a screen like this:

![](https://github.com/wz-ml/NotAnAutocompleteAI/blob/master/example.png?raw=true)

5. Go to File -> Add Project Folder -> Add the repo folder.

![](https://github.com/wz-ml/NotAnAutocompleteAI/blob/master/example2.png?raw=true)

## Start editing!
Go to `mynewfile1.txt` and start editing! You should be able to see autocompletion suggestions after typing a sentence or so.
Any new text files created in the repo folder will have the autocomplete functionality enabled!

![](https://github.com/wz-ml/NotAnAutocompleteAI/blob/master/example3.png?raw=true)

GPT-2 will often give different suggestions when you put in the same input multiple times. Try it out!

## Backend API
NotAnAutocompleteAI relies on Huggingface's GPT-2 API to provide suggestions. Direct API link:
https://transformer.huggingface.co/autocomplete/distilgpt2/medium

## Credit goes to...
Built on [atom-autocomplete-boilerplate](https://github.com/lonekorean/atom-autocomplete-boilerplate).
GPT-2 API credit goes to [Huggingface Transformers](https://github.com/huggingface/transformers). [LICENSE](https://github.com/huggingface/transformers/blob/master/LICENSE)
