import test from 'node:test';
import assert from 'node:assert/strict';
import { createGoogleLogin, loginErrorMessage } from '../src/services/googleLogin.js';
const create = (overrides = {}) => createGoogleLogin({auth:{},provider:{},popup:async()=>({user:{uid:'test'}}),redirect:()=>assert.fail('Unexpected redirect'),redirectResult:async()=>null,...overrides});
test('successful popup shares pending submissions and allows another attempt', async()=>{
 let calls=0;const action=create({popup:async()=>{calls++;return {user:{uid:'test'}}}});
 const first=action.login();assert.equal(action.login(),first);assert.equal((await first).uid,'test');await action.login();assert.equal(calls,2);
});
test('cancellation, network and configuration errors stay on login and allow retry',async()=>{
 for(const code of ['auth/popup-closed-by-user','auth/cancelled-popup-request','auth/network-request-failed','auth/unauthorized-domain','auth/operation-not-allowed']){
 const action=create({popup:async()=>{throw {code}}});await assert.rejects(action.login(),e=>e.code===code);await assert.rejects(action.login(),e=>e.code===code);
 assert.ok(!loginErrorMessage({code,message:'private details'}).includes('private details'));
 }
});
test('only blocked popups redirect and redirect errors propagate',async()=>{
 let count=0;const popup=async()=>{throw {code:'auth/popup-blocked'}};
 assert.equal(await create({popup,redirect:async()=>{count++}}).login(),null);assert.equal(count,1);
 await assert.rejects(create({popup,redirect:async()=>{throw Error('redirect failed')}}).login(),/redirect failed/);
});
test('redirect results and errors are consumed once across StrictMode mounts',async()=>{
 for(const fails of [false,true]){let count=0;const action=create({redirectResult:async()=>{count++;if(fails)throw Error('redirect failed');return {user:{uid:'test'}}}});
 const first=action.completeRedirect();assert.equal(action.completeRedirect(),first);
 if(fails)await assert.rejects(first,/redirect failed/);else assert.equal((await first).user.uid,'test');assert.equal(count,1);}
});
test('missing configuration cannot initiate sign-in',async()=>{
 const action=create({auth:null,popup:()=>assert.fail('Unexpected popup')});await assert.rejects(action.login(),/unavailable/);assert.equal(await action.completeRedirect(),null);
});
