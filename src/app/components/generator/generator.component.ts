import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  form = this.fb.group({
    prizes: ['', Validators.required],
    users: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        trophies: ['', Validators.required]
      }),
      this.fb.group({
        name: ['', Validators.required],
        trophies: ['', Validators.required]
      })
    ])
  });

  results :any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get users(){
    return this.form.controls["users"] as FormArray;
  }

  addUser(){
    const userForm = this.fb.group({
      name: ['', Validators.required],
      trophies: ['', Validators.required]
    });

    this.users.push(userForm);
  }

  deleteUser(categoryIndex: number){
    this.users.removeAt(categoryIndex);
  }

  calculate(){
    this.results = [];
    const value = this.form.value;
    const n_users = value.users.length;

    let tot_trophies = 0;
    value.users.forEach((user :any) => tot_trophies += parseInt(user.trophies));

    value.users.forEach((user :any) => {
      const row = {
        name: user.name,
        trophies: (value.prizes / tot_trophies) * user.trophies
      }
      this.results.push(row);
    });
    console.log("tot_trophies:", tot_trophies);
    console.log(this.results);
  }

  print(){
    console.log(this.form.value);
  }

}
