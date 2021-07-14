drop table if exists station;
create table station
(
    id           bigserial not null constraint station_pk primary key,
    station_name        varchar(100),
    creator          varchar(100),
    create_date             timestamptz default now(),
    modify_date             timestamptz
);