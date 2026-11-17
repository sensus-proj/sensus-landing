import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildInviteDeepLinks, parseInviteParams } from '../../public/js/ui/inviteHandler.js';

test('parseInviteParams extracts valid invite code and name', () => {
  const parsed = parseInviteParams('?code=sns-1a2b3c&name=Beto');
  assert.deepEqual(parsed, { code: 'SNS-1A2B3C', name: 'Beto', isFallback: false });
});

test('parseInviteParams returns null for missing or invalid code', () => {
  assert.equal(parseInviteParams(''), null);
  assert.equal(parseInviteParams('?code=bad'), null);
});

test('buildInviteDeepLinks constructs intent fallback without looping code trigger', () => {
  const links = buildInviteDeepLinks('SNS-1A2B3C', 'Beto');
  assert.ok(links.intentUrl.startsWith('intent://invitacion?code=SNS-1A2B3C&name=Beto#Intent;scheme=sensus;package=sensus.com;'));
  assert.ok(links.fallbackUrl.includes('invite_fallback=1'));
  assert.equal(links.schemeUrl, 'sensus://invitacion?code=SNS-1A2B3C&name=Beto');
});
