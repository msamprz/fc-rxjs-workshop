# NgRxjsWorkshop

A base RxJS repo with a challenge to let people demonstrate their RxJS reactive-thinking skills.

### Challenge

Your imaginary PM complains that users can't tell when the app is processing their information.

They have asked you to show a loading spinner any time there is any task running in the app.

### Technical info

- You have decided to use a spinner library to save yourself the presentational logic and template. This library provides a service `SpinnerService` to interact with the spinner.
- You can use the `show(): void` and `hide(): void` methods of the `SpinnerService` to show/hide the spinner onto the page respectively.


### Important
- Please note that the `BackgroundTaskCounterService`, as well as the `Background tasks: {{ backgroundTaskCounterService.taskCount }}` text in the `app.component.ts` are merely meant for your ease of debugging. You need to solve this challenge as if that flow does not exist. This is why the `BackgroundTaskCounterService` is hidden away behind the `app-button` presentation component.
- Therefore, you will mainly be working on the `TaskService`/`task.service.ts` file.
