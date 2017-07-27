import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// export const Roles = (target, ...rolesAllowed: Array<string>) => {
export const Roles = (...rolesAllowed: Array<string>) => {
  // console.log('Roles: Start');
  // // console.log(target);
  // console.log(rolesAllowed);
  // console.log('Roles: End');
  // return target.CanActivate(() => {

  //   return true;
  // });
  return (target) => {
    // Object.defineProperty(target.prototype, 'course', {value: () => "Angular 2"})
  };
};
