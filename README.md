# Taskly

## Todo

- [ ] Fix header button press bug on Counter stack
  - When I added icon button to headerRight with link to history screen, link action don't work on press
  - Temporarily move this button to tab stack
  - Related links:
    - https://github.com/expo/expo/issues/33093
    - https://github.com/expo/expo/issues/29489
    - https://github.com/software-mansion/react-native-screens/issues/2219
    - https://github.com/react-navigation/react-navigation/issues/12039

## Improvemen

- [ ] Add SQLite for storing data
- [ ] Improve types in orderList function arguments

## Bugs

- [ ] on android, when I schedule notification after 10 sec, it continues repeating over and over again. On iOS on other hand works good but ignore `repeats: true` option
