import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Inbox } from './pages/inbox/inbox';
import { Request } from './pages/request/request';
import { Kanban } from './pages/kanban/kanban';
import { Device } from './pages/device/device';
import { Chips } from './pages/chips/chips';

export const routes: Routes = [
    { path: 'home', component: Home},
    { path: 'inbox', component: Inbox},
    { path: 'requests', component: Request},
    { path: 'kanban', component: Kanban},
    { path: 'device', component: Device},
    { path: 'chips', component: Chips},
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
