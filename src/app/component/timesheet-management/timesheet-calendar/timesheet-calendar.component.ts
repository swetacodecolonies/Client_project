import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { AddEditTimesheetComponent } from '../add-edit-timesheet/add-edit-timesheet.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timesheet-calendar',
  templateUrl: './timesheet-calendar.component.html',
  styleUrl: './timesheet-calendar.component.scss'
})
export class TimesheetCalendarComponent {
  [x: string]: any;
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;

  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      //color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
     // color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      //color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  constructor(private modal: NgbModal) {

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    debugger
    const clickedDate = date;
    const AllDay=true;
    const currentDate = new Date();
    const selectedDate = new Date(clickedDate);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(clickedDate, 'yyyy-MM-ddTHH:mm:ss.SSS');
    // Check if the selected date is in the future
    if (selectedDate.getTime() >= currentDate.setHours(0, 0, 0, 0)) {
    //  this.timesheetmodel.Interview_Date = formattedDate;
      const modalRef = this.modal.open(AddEditTimesheetComponent , { size: 'xl' });
      modalRef.componentInstance.DataOf = formattedDate;
      modalRef.result
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Use SweetAlert for a nicer notification
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'You have selected a past date. If you want to fill timesheet , please start from today onwards.',
      });
    }


    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {

    debugger
    this.modalData = { event, action };
    this.modal.open(AddEditTimesheetComponent, { size: 'xl' });
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
