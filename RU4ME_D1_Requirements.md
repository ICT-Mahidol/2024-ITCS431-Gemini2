## Functional Requirements

1. **Access Control and User Roles**:
   - The system must allow login and configuration for all users.
   - The system must establish privileges during user authentication and authorization for Astronomers, Science Observers, Telescope Operators.
   - Different user roles (e.g., Astronomers, Science Observers, Telescope Operators, Support staff, Developer) must have tailored access to certain operational levels and modes.
1. **Observing and Monitoring**:
   - The system must allow remote monitoring of telescope operations with user-customizable data display for science observers.
   - The system must allow remote access for testing, diagnostics, and system maintenance for telescope operators.
   - The system must support real-time data acquisition and validation by science observers.
1. **Scheduling and Observing Modes**:
   - The system must implement flexible scheduling to switch between telescope modes and instruments during the night for telescope operators.
   - The system must automate queue-based observing, allowing observations to be prioritized and sorted dynamically.
   - Support service observing, where data collection can be executed by someone other than the proposing astronomer.
1. **Data Handling**:
   - Automatically archive observational data.
   - The system must maintain at least two copies of raw data for quality and safety purposes.
   - The system must log all input and output data, including error conditions and timestamps for traceability.
1. **Instrument and Subsystem Management**:
   - Ensure subsystems can operate independently without affecting telescope functionality.
   - The system must enable remote reconfiguration of the observing environment for science observers.
1. **Fault Management**:
   - Prevent subsystem failures from affecting other operational components.
1. **User Interface Requirements:**
   - The system must support multiple user stations with role-specific interfaces.
1. **Observing Assistance:**
   - The system must allow observers to interact with scheduling queues and make adjustments based on conditions.

## Non-functional Requirements

1. **Performance and Reliability**:
   - The system must ensure timely response for commands and interactions, with timeouts for delayed replies.
   - The system must support simultaneous operations at multiple nodes of the system.
   - The system must maintain high availability to support continuous night-time observations.
2. **Security**:
   - The system must restrict telescope control to authorized users and specific sites based on security protocols.
   - The system must provide secure remote access while ensuring system integrity and safety.
3. **Data Integrity**:
   - The system must ensure that data stored in archives and intermediate storage meets high standards of accuracy and reliability.
   - The system must preserve consistency in relational database systems used for storing configuration and maintenance logs.
4. **Ease of Maintenance**:
   - The system must ensure that maintenance procedures are user-friendly for developers and support staff.
   - The system must provide version control and easy integration for software updates.
5. **User Experience**:
   - The system must provide simple, secure, consistent and user-friendly graphical interfaces for astronomers to manage observations.
   - Ensure a seamless experience for both local and remote users.
