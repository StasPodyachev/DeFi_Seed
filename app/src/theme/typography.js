import { breakpoints, pxToRem } from './handlers';

const typography = {
  fontFamily: 'Source Code Pro',
  subtitle1: {
    fontSize: pxToRem(10),
    lineHeight: pxToRem(14),
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: pxToRem(12),
    lineHeight: pxToRem(16),
    fontWeight: 400,
  },
  body1: {
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
    fontWeight: 400,
  },
  body2: {
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
    fontWeight: 400,
  },
  h6: {
    fontSize: pxToRem(20),
    lineHeight: pxToRem(28),
    fontWeight: 400,
  },
  h5: {
    fontSize: pxToRem(24),
    lineHeight: pxToRem(32),
    fontWeight: 400,
  },
  h4: {
    fontSize: pxToRem(28),
    lineHeight: pxToRem(36),
    fontWeight: 400,
  },
  h1: {
    fontSize: pxToRem(20),
    lineHeight: pxToRem(28),
    fontWeight: 700,
  },
  button: {
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
  },
};

export default typography;
