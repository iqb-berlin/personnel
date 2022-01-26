import { Component, OnInit } from '@angular/core';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';
import { PersonnelService } from '../services/personnel.service';

@Component({
  selector: 'personnel-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  personnel: PersonDto[] = [];
  infoMessage = '';

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
    this.personnelService.read().subscribe({
      next: (personnel: PersonDto[]) => this.personnel = personnel,
      error: (error: unknown) => console.error(`There was an error loading the personnel: ${error}`)
    });
  }

  addPerson(): void {
    const person: CreatePersonDto = {
      forename: PersonnelComponent.randomForename(),
      surname: PersonnelComponent.randomSurname(),
      birthday: PersonnelComponent.randomDate()
    };

    this.personnelService.create(person).subscribe({
      next: (personDto: PersonDto | void) => {
        if (personDto) {
          console.log(personDto);
        }
        this.loadPersonnel();
        this.infoMessage = '';
      },
      error: (error: unknown) => console.error(`There was an error adding personnel: ${error}`)
    });
  }

  readPerson(personId: string): void {
    this.personnelService.readById(personId).subscribe({
      next: (personDto: PersonDto) => {
        console.log(personDto);
        this.infoMessage = JSON.stringify(personDto);
      },
      error: (error: unknown) => console.error(`There was an error reading personnel: ${error}`)
    });
  }

  updatePerson(person: PersonDto): void {
    this.personnel.forEach(value => {
      if (value.id === person.id) {
        let surname = PersonnelComponent.randomSurname();
        while (person.surname === surname) {
          surname = PersonnelComponent.randomSurname();
        }

        const updatePersonDto: UpdatePersonDto = {
          forename: person.forename,
          surname: surname,
          birthday: person.birthday
        };
        this.personnelService.update(person.id, updatePersonDto).subscribe({
          next: (personDto: PersonDto | void) => {
            if (personDto) {
              console.log(personDto);
            }
            this.loadPersonnel();
            this.infoMessage = '';
          },
          error: (error: unknown) => console.error(`There was an error updating personnel: ${error}`)
        });
      }
    });
  }

  deletePerson(personId: string): void {
    this.personnel.forEach(value => {
      if (value.id === personId) {
        this.personnelService.delete(personId).subscribe({
          next: (personDto: PersonDto | void) => {
            if (personDto) {
              console.log(personDto);
            }
            this.loadPersonnel();
            this.infoMessage = '';
          },
          error: (error: unknown) => console.error(`There was an error deleting personnel: ${error}`)
        });
      }
    });
  }

  sayHelloTo(person: PersonDto): void {
    this.infoMessage = `Hello ${person.forename} ${person.surname}!`;
  }
}
