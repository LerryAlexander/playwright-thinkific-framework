export const baseUrl = 'https://lerry-s-school-4d7b.thinkific.com';

export const routes = {
  signIn: '/users/sign_in',
  enrollments: '/enrollments',
  onboardingSignIn: '/onboarding/signin',
  manage: '/manage',
  coursesList: '/manage/courses',
  coursePage: /\/manage\/courses\/\d+\?generated=1/,
  createCourseModal: '/manage/products/generate/course',
  courseOutlineRegex: /\/manage\/courses\/\d+$/,
  newChapterRegex: /\/manage\/courses\/\d+\/chapters\/new/,
  lessonTypeChooserRegex: /\/manage\/courses\/\d+\/chapters\/\d+\/contents\/new_choose_lessons/,
  newLessonEditorRegex: /\/manage\/courses\/\d+\/chapters\/\d+\/contents\/new_.+_lesson/,
  lessonViewRegex: /\/manage\/courses\/\d+\/contents\/\d+/,
  settingViewRegex: /\/manage\/courses\/\d+\/settings/,
  pricingViewRegex: /\/manage\/courses\/\d+\/pricing/
};
