// В этом файле мы пишем код который будет вызываться в каждом .test файле, например нам теперь не нужно указывать в кажлом файле с тестами import '@testing-library/jest-dom';
// этот файл подключается в поле  setupFilesAfterEnv jest.config например  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts']
import '@testing-library/jest-dom';

// import 'regenerator-runtime/runtime'; // пока работает и без него нужен что бы jest мог работать с аснихронными функциями и кодом
