import { Component, OnInit } from '@angular/core';
import { CreateUserDto, UpdateUserDto, UserDto } from '@personnel/iqb-personnel-dtos';
import { UserService } from '../services/user.service';

@Component({
  selector: 'personnel-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: UserDto[] = [];
  infoMessage = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.read().subscribe({
      next: (users: UserDto[]) => this.users = users,
      error: (error: unknown) => console.error(`There was an error loading the users: ${error}`)
    });
  }

  addUser(): void {
    const user: CreateUserDto = {
      name: 'peter',
      password: 'pan'
    };

    this.userService.create(user).subscribe({
      next: (userDto: UserDto | void) => {
        if (userDto) {
          console.log(userDto);
        }
        this.loadUsers();
        this.infoMessage = '';
      },
      error: (error: unknown) => console.error(`There was an error adding user: ${error}`)
    });
  }

  readUser(userId: string): void {
    this.userService.readById(userId).subscribe({
      next: (userDto: UserDto) => {
        this.infoMessage = JSON.stringify(userDto);
        console.log(userDto);
      },
      error: (error: unknown) => console.error(`There was an error reading users: ${error}`)
    });
  }

  updateUser(user: UserDto): void {
    this.users.forEach(value => {
      if (value.id === user.id) {
        const updateUserDto: UpdateUserDto = {
          name: user.name,
          password: 'parker'
        };
        this.userService.update(user.id, updateUserDto).subscribe({
          next: (userDto: UserDto | void) => {
            if (userDto) {
              console.log(userDto);
            }
            this.loadUsers();
            this.infoMessage = '';
          },
          error: (error: unknown) => console.error(`There was an error updating users: ${error}`)
        });
      }
    });
  }

  deleteUser(userId: string): void {
    this.users.forEach(value => {
      if (value.id === userId) {
        this.userService.delete(userId).subscribe({
          next: (userDto: UserDto | void) => {
            if (userDto) {
              console.log(userDto);
            }
            this.loadUsers();
            this.infoMessage = '';
          },
          error: (error: unknown) => console.error(`There was an error deleting users: ${error}`)
        });
      }
    });
  }
}
