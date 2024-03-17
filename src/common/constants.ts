import { Dimensions, Platform, StatusBar } from 'react-native';

// Device Dimensions
const iPhoneX: boolean = Dimensions.get('window').height === 812;
export const STATUSBAR_HEIGHT: number | any =
  Platform.OS === 'ios' ? (iPhoneX ? 44 : 22) : StatusBar.currentHeight;
export const fullScreenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
export const isAndroid = Platform.OS !== 'ios';
export const screenHeight: number =
  Dimensions.get('window').height

let sampleWidth = 414;
const scale = (size: number) => (screenWidth / sampleWidth) * size;

// Moderate Scale Function
export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

//Api request Response Codes
export const responseCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  CONFLICT: 409,
  BED_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIME_OUT: 408,
  UNPROCESSED_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BED_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATE_WAY_TIMEOUT: 504,
  NETWORK_AUTH_REQUIRED: 511,
  NETWORK_UNREACHABLE: 512,
  REDIRECT: 302,
  TOKEN_EXPIRED: 411,
};
