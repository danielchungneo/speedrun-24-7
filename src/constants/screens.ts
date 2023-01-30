const SCREENS = {

  // App Screens
  HOME: "Home" as never,
  RUN_DASHBOARD: "RunDashboard" as never,


  /**
   * AUTH SCREENS
   */
  AUTH_STACK: 'AuthStack' as never,
  LOGIN: 'Login' as never,
  REGISTER: 'Register' as never,
  RESET_PASSWORD: 'ResetPassword' as never,
  RESET_PASSWORD_REQUEST: 'ResetPasswordRequest' as never,

  /**
   * MAIN SCREENS (used in most projects)
   */
  MAIN_STACK: 'MainStack' as never,
  MAIN_TABS: 'MainTabs' as never,
  //
  SETTINGS_TAB: 'SettingsTab' as never,
  SETTINGS: 'Settings' as never,
  ABOUT: 'About' as never,
  PRIVACY: 'Privacy' as never,
  AGREEMENT: 'Agreement' as never,
  PROFILE: 'Profile' as never,
  LANDING: 'Landing' as never,

  ENTITY_TEMPLATE_TAB: 'EntityTemplateTab' as never,
  ENTITY_TEMPLATE_LIST: 'EntityTemplateList' as never,
  ENTITY_TEMPLATE_EDIT: 'EntityTemplateEdit' as never,

  /**
   * MC-APP DEMO SCREENS: REMOVE_ME
   */
  MC_DASHBOARD: 'Dashboard' as never,
  //
  MC_CUSTOMER_TAB: 'CustomerTab' as never,
  MC_CUSTOMER_LIST: 'CustomersList' as never,
  MC_CUSTOMER_EDIT: 'CustomerEdit' as never,

  /**
   * UI Testing (my own playground .. kinda like Storybook but for React Native)
   */
  UI_TESTING_HOME: 'UiTestingHome' as never,
};

export default SCREENS;
