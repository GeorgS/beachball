import execa from 'execa';
import { AuthType } from '../types/Auth';

export function npm(args: string[], options: execa.SyncOptions = {}) {
  try {
    const result = execa.sync('npm', args, { ...options });
    return {
      ...result,
      success: !result.failed,
    };
  } catch (e) {
    return {
      ...e,
      success: false,
    };
  }
}

export async function npmAsync(args: string[], options: execa.Options = {}) {
  try {
    const result = await execa('npm', args, { ...options });
    return {
      ...result,
      success: !result.failed,
    };
  } catch (e) {
    return {
      ...e,
      success: false,
    };
  }
}

export function getNpmAuthArgs(registry: string, token?: string, authType?: AuthType): string[] {
  const authArgs: string[] = [];

  if (token) {
    let npmKeyword = '_authToken';
    if (authType === 'password') npmKeyword = '_password';
    if (authType === 'auth') npmKeyword = '_auth';

    const shorthand = registry.substring(registry.indexOf('//'));
    authArgs.push(`--${shorthand}:${npmKeyword}=${token}`);
  }
  return authArgs;
}
