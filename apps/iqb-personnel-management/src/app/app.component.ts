/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { PersonnelService } from './services/personnel.service';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';

@Component({
  selector: 'personnel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  personnel: PersonDto[] = [];
  greetings = '';

  constructor(private personnelService: PersonnelService) {
  }

  private static randomForename() {
    const forenames: string[] =
      ['Stefan', 'Michael', 'Christian', 'Thomas', 'Thorsten', 'Julia', 'Sarah', 'Sandra', 'Nicole', 'Melanie'];

    return forenames[Math.floor(Math.random() * forenames.length)];
  }

  private static randomSurname() {
    const surnames: string[] =
      ['Müller', 'Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Meyer', 'Weber', 'Hofmann', 'Wagner', 'Becker'];

    return surnames[Math.floor(Math.random() * surnames.length)];
  }

  private static randomDate(): Date {
    const today = new Date();
    const start = new Date(today.getFullYear() - 67, 0, 1);
    const end = new Date(today.getFullYear() - 16, 0, 1);

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  ngOnInit(): void {
    this.loadPersonnel();
  }

  loadPersonnel(): void {
    this.personnelService.read().subscribe(personnel => {
      this.personnel = personnel;
    }, error => {
      console.error(`There was an error loading the personnel: ${error}`);
    });
  }

  addPerson(): void {
    const person: CreatePersonDto = {
      forename: AppComponent.randomForename(),
      surname: AppComponent.randomSurname(),
      birthday: AppComponent.randomDate()
    };

    this.personnelService.create(person).subscribe(personDto => {
      console.log(personDto);
      this.loadPersonnel();
      this.greetings = '';
    }, error => {
      console.error(`There was an error adding personnel: ${error}`);
    });
  }

  readPerson(personId: string): void {
    this.personnelService.readById(personId).subscribe(personDto => {
      console.log(personDto);
      this.greetings = JSON.stringify(personDto);
    }, error => {
      console.error(`There was an error reading personnel: ${error}`);
    });
  }

  updatePerson(person: PersonDto): void {
    this.personnel.forEach(value => {
      if (value.id === person.id) {
        let surname = AppComponent.randomSurname();
        while (person.surname === surname) {
          surname = AppComponent.randomSurname();
        }

        const updatePersonDto: UpdatePersonDto = {
          forename: person.forename,
          surname: surname,
          birthday: person.birthday
        };
        this.personnelService.update(person.id, updatePersonDto).subscribe(personDto => {
          console.log(personDto);
          this.loadPersonnel();
          this.greetings = '';
        }, error => {
          console.error(`There was an error updating personnel: ${error}`);
        });
      }
    });
  }

  deletePerson(personId: string): void {
    this.personnel.forEach(value => {
      if (value.id === personId) {
        this.personnelService.delete(personId).subscribe(personDto => {
          console.log(personDto);
          this.loadPersonnel();
          this.greetings = '';
        }, error => {
          console.error(`There was an error deleting personnel: ${error}`);
        });
      }
    });
  }

  sayHelloTo(person: PersonDto): void {
    this.greetings = `Hello ${person.forename} ${person.surname}!`;
  }
}
