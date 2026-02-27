import '@testing-library/jest-dom';

// Mock all Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({
    name: '[DEFAULT]',
    options: {},
  })),
  getApp: jest.fn(),
  getApps: jest.fn(() => []),
  deleteApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(() => ({
    id: 'mock-collection',
    path: 'mock-path',
  })),
  doc: jest.fn(() => ({
    id: 'mock-doc',
    path: 'mock-path',
  })),
  getDocs: jest.fn(() => Promise.resolve({
    docs: [],
    empty: true,
    size: 0,
  })),
  getDoc: jest.fn(() => Promise.resolve({
    exists: () => false,
    data: () => ({}),
    id: 'mock-doc',
  })),
  addDoc: jest.fn(() => Promise.resolve({
    id: 'mock-new-doc-id',
  })),
  deleteDoc: jest.fn(() => Promise.resolve()),
  updateDoc: jest.fn(() => Promise.resolve()),
  setDoc: jest.fn(() => Promise.resolve()),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  onSnapshot: jest.fn(() => jest.fn()),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
    user: { uid: 'mock-uid', email: 'test@example.com' },
  })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({
    user: { uid: 'mock-uid', email: 'test@example.com' },
  })),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  GoogleAuthProvider: jest.fn(() => ({})),
  signInWithPopup: jest.fn(() => Promise.resolve({
    user: { uid: 'mock-uid', email: 'test@example.com' },
  })),
}));

// Mock your firebase config file if you have one
jest.mock('./app/firebase/config', () => ({
  db: {},
  auth: {},
  storage: {},
}), { virtual: true });