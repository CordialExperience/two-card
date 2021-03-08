# Maksym Kobieliev's TwoCard game implementation

First of all, I have to thank you for this opportunity. Since I haven't had too much experience with react (especially with react unit testing), I decided to use this task to learn something new for myself. Obviously, I have spent more than 3 hours on this, but that was definitely to my own benefit, so I hope it's not a problem for you.

This implementation is still far from being "perfect", but I had the time limitations anyway.

I mention Angular a few times throughout this document - it's just because that's the framework I've had the most experience with in the last few years. Hopefully my lack of experience with React hasn't had much influence on the quality of the code itself.

## What could be further improved?
- Convert project to `Typescript`. Since it's just a test task, it's all fine. But in a production environment, working on a big scale project, I'd definitely add a typing system. FWIW, you won't find many JSdoc typing comments in my implementation. IMO `Typescript` nowadays is a much more convenient and useful way to power up intellisense, compared to `JSDOC`. I'd only use `JSDOC` for documentation comments, but not for type annotations.
- Add comments. By most part, this code should be quite simple and clear even without comments. But on some projects the team may decide to make documentation comments obligatory even for trivial functions/classes/variables/fields/variables.
- Use `redux`. Again, for a small project like this no `redux` is fine. But for bigger-scale apps it's a must. 
- Use `scss`/`sass` for styling instead of plain css.
- In my implementation, I'm just using card svgs hosted at a 3rd party, but in a real project we shouldn't need to rely on any 3rd party servers. We should either download images into the project folder or (preferably) use an npm package like `deck-of-cards` or `svg-cards` and include the files into the project.
- It takes quite some time for the browser to load card images; ideally the app should pre-load all the card images automatically after app load.
- Add coding style conventions. On a bigger-scale production project, this is necessary, especially if there's more than 1 person working on it.
- Set up a specific formatter to be used by all team members. I was using `prettier` (without any custom configuration), but it tends to reformat files completely from time to time. Need to have a consistent tool and a consistent set of rules based on established coding style conventions.
- `editorconfig` would also help with basic formatting settings.
- Use a linter like `eslint` and set up its set of rules based on the coding conventions.
- Globalize the application, if it's expected to be localized for multiple locales.

## Here are some points that I find questionable about my implementation: 
- File grouping. In `Angular` projects, especially under micro-services architecture, I find it most reasonable to group all files by feature. I believe this should hold true for react projects as well. Technically, in this project we have just a single feature though, so I grouped files by type: pure logic into one folder, React components into another one.
- Filename casing. I'm not yet sure what would really be the best practice for react projects. Currently, in my implementation the first letter is Uppercase only if it's a React component file. Otherwise, the first letter of the filename is lowercase. I use camelCase for the rest of the filename, but I'm not 100% sure it fits better than kebab-case.
- CSS classes naming conventions. I started the class names with an Uppercase letter if they were applied to the root element of a react component, but in other cases I used lowercase letters. Not sure if it makes sense, but it felt reasonable to distinguish root elements from any other elements in the template.
- ES6 absolute import paths. It would make sense to configure react-scripts to allow for them. Absolute imports are in many cases better than relative ones.
- Default/non-default exports: Currently, I use default exports for components, but non-default exports in other cases. In Angular, you almost never use default exports due to angular compiler limitations. I'm not sure yet what would be the best practice for react projects.
- Composition of the data about cards, colors and the numbers of pairs for each hand is an open question, it can be done in multiple ways.
- Using `<ul/>`s and `<li/>`s for rendering hands and their cards would make much sense semantically. But I ignored that for the purpose of this task.
- I decided to use `@testing-library/react` instead of just the native `ReactDOM.xxxx` functionality. I never worked with `@testing-library` before, but decided to give it a try, because it seems to be much less verbose and builds on a very reasonable idea of searching for elements based on user-identifiable characteristics (aria roles, inner text etc).
- At the same time, I've found that mocking React components in `Jest` with `React Testing Library` does not seem to be convenient. Maybe I'm just missing something.
- I had to update `Jest` to latest version to be able to seamlessly use `@testing-library/react`. I hope it's not a problem.

PS. FWIW, I accidentally found this project: https://github.com/joecal/WildfireCC, it seems like your task was based on that. :) Didn't look into the code though.