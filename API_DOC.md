## Functions

<dl>
<dt><a href="#chatHandler">chatHandler(socket)</a></dt>
<dd><p>Handles chat-related events for Socket.IO.</p>
</dd>
<dt><a href="#clientHandler">clientHandler(socket)</a></dt>
<dd><p>Handles client-related events for Socket.IO.</p>
</dd>
<dt><a href="#contactHandler">contactHandler(socket)</a></dt>
<dd><p>Handles contact-related events for Socket.IO.</p>
</dd>
<dt><a href="#messageHandler">messageHandler(socket)</a></dt>
<dd><p>Menangani event terkait pesan untuk Socket.IO.</p>
</dd>
<dt><a href="#sessionHandler">sessionHandler(socket)</a></dt>
<dd><p>Handles session-related events for Socket.IO.</p>
</dd>
<dt><a href="#registerHandlers">registerHandlers(socket)</a></dt>
<dd><p>Menggabungkan semua handler untuk Socket.IO.</p>
</dd>
</dl>

## Events

<dl>
<dt><a href="#event_getClassInfo">"getClassInfo" (data, callback)</a></dt>
<dd><p>Gets information about a chat.</p>
</dd>
<dt><a href="#event_clearMessages">"clearMessages"</a></dt>
<dd><p>Clears all messages in a chat.</p>
</dd>
<dt><a href="#event_clearState">"clearState"</a></dt>
<dd><p>Clears typing or recording state in a chat.</p>
</dd>
<dt><a href="#event_deleteChat">"deleteChat"</a></dt>
<dd><p>Deletes a chat.</p>
</dd>
<dt><a href="#event_fetchMessages">"fetchMessages"</a></dt>
<dd><p>Fetches messages from a chat.</p>
</dd>
<dt><a href="#event_getContact">"getContact"</a></dt>
<dd><p>Gets the contact for a chat.</p>
</dd>
<dt><a href="#event_sendStateRecording">"sendStateRecording"</a></dt>
<dd><p>Sends a recording state.</p>
</dd>
<dt><a href="#event_sendStateTyping">"sendStateTyping"</a></dt>
<dd><p>Sends a typing state.</p>
</dd>
<dt><a href="#event_sendMessage">"sendMessage"</a></dt>
<dd><p>Sends a message to a chat.</p>
</dd>
<dt><a href="#event_isRegisteredUser">"isRegisteredUser"</a></dt>
<dd><p>Checks if a number is registered on WhatsApp.</p>
</dd>
<dt><a href="#event_createGroup">"createGroup"</a></dt>
<dd><p>Creates a new WhatsApp group.</p>
</dd>
<dt><a href="#event_setStatus">"setStatus"</a></dt>
<dd><p>Sets the WhatsApp status (bio).</p>
</dd>
<dt><a href="#event_getContacts">"getContacts"</a></dt>
<dd><p>Retrieves the user&#39;s contacts.</p>
</dd>
<dt><a href="#event_getChats">"getChats"</a></dt>
<dd><p>Retrieves the user&#39;s chat list.</p>
</dd>
<dt><a href="#event_acceptInvite">"acceptInvite"</a></dt>
<dd><p>Accepts a WhatsApp group invitation.</p>
</dd>
<dt><a href="#event_getWWebVersion">"getWWebVersion"</a></dt>
<dd><p>Retrieves the current WhatsApp Web version.</p>
</dd>
<dt><a href="#event_getClassInfo">"getClassInfo"</a></dt>
<dd><p>Retrieves contact information.</p>
</dd>
<dt><a href="#event_block">"block"</a></dt>
<dd><p>Blocks a contact.</p>
</dd>
<dt><a href="#event_getAbout">"getAbout"</a></dt>
<dd><p>Retrieves a contact&#39;s &quot;About&quot; information.</p>
</dd>
<dt><a href="#event_getChat">"getChat"</a></dt>
<dd><p>Retrieves chat information of a contact.</p>
</dd>
<dt><a href="#event_getFormattedNumber">"getFormattedNumber"</a></dt>
<dd><p>Retrieves formatted number of a contact.</p>
</dd>
<dt><a href="#event_getCountryCode">"getCountryCode"</a></dt>
<dd><p>Retrieves country code of a contact.</p>
</dd>
<dt><a href="#event_getProfilePicUrl">"getProfilePicUrl"</a></dt>
<dd><p>Retrieves profile picture URL of a contact.</p>
</dd>
<dt><a href="#event_unblock">"unblock"</a></dt>
<dd><p>Unblocks a contact.</p>
</dd>
</dl>

<a name="chatHandler"></a>

## chatHandler(socket)
Handles chat-related events for Socket.IO.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | The connected Socket.IO client. |

<a name="clientHandler"></a>

## clientHandler(socket)
Handles client-related events for Socket.IO.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | The connected Socket.IO client. |

<a name="contactHandler"></a>

## contactHandler(socket)
Handles contact-related events for Socket.IO.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | The connected Socket.IO client. |

<a name="messageHandler"></a>

## messageHandler(socket)
Menangani event terkait pesan untuk Socket.IO.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | Klien Socket.IO yang terhubung. |

<a name="sessionHandler"></a>

## sessionHandler(socket)
Handles session-related events for Socket.IO.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | The connected Socket.IO client. |

<a name="registerHandlers"></a>

## registerHandlers(socket)
Menggabungkan semua handler untuk Socket.IO.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | Objek socket yang terhubung. |

<a name="event_getClassInfo"></a>

## "getClassInfo" (data, callback)
Gets information about a chat.

**Kind**: event emitted  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Data payload. |
| data.sessionId | <code>string</code> | The session ID. |
| data.chatId | <code>string</code> | The chat ID. |
| callback | <code>function</code> | Callback function to return response. |

<a name="event_clearMessages"></a>

## "clearMessages"
Clears all messages in a chat.

**Kind**: event emitted  
<a name="event_clearState"></a>

## "clearState"
Clears typing or recording state in a chat.

**Kind**: event emitted  
<a name="event_deleteChat"></a>

## "deleteChat"
Deletes a chat.

**Kind**: event emitted  
<a name="event_fetchMessages"></a>

## "fetchMessages"
Fetches messages from a chat.

**Kind**: event emitted  
<a name="event_getContact"></a>

## "getContact"
Gets the contact for a chat.

**Kind**: event emitted  
<a name="event_sendStateRecording"></a>

## "sendStateRecording"
Sends a recording state.

**Kind**: event emitted  
<a name="event_sendStateTyping"></a>

## "sendStateTyping"
Sends a typing state.

**Kind**: event emitted  
<a name="event_sendMessage"></a>

## "sendMessage"
Sends a message to a chat.

**Kind**: event emitted  
<a name="event_isRegisteredUser"></a>

## "isRegisteredUser"
Checks if a number is registered on WhatsApp.

**Kind**: event emitted  
<a name="event_createGroup"></a>

## "createGroup"
Creates a new WhatsApp group.

**Kind**: event emitted  
<a name="event_setStatus"></a>

## "setStatus"
Sets the WhatsApp status (bio).

**Kind**: event emitted  
<a name="event_getContacts"></a>

## "getContacts"
Retrieves the user's contacts.

**Kind**: event emitted  
<a name="event_getChats"></a>

## "getChats"
Retrieves the user's chat list.

**Kind**: event emitted  
<a name="event_acceptInvite"></a>

## "acceptInvite"
Accepts a WhatsApp group invitation.

**Kind**: event emitted  
<a name="event_getWWebVersion"></a>

## "getWWebVersion"
Retrieves the current WhatsApp Web version.

**Kind**: event emitted  
<a name="event_getClassInfo"></a>

## "getClassInfo"
Retrieves contact information.

**Kind**: event emitted  
<a name="event_block"></a>

## "block"
Blocks a contact.

**Kind**: event emitted  
<a name="event_getAbout"></a>

## "getAbout"
Retrieves a contact's "About" information.

**Kind**: event emitted  
<a name="event_getChat"></a>

## "getChat"
Retrieves chat information of a contact.

**Kind**: event emitted  
<a name="event_getFormattedNumber"></a>

## "getFormattedNumber"
Retrieves formatted number of a contact.

**Kind**: event emitted  
<a name="event_getCountryCode"></a>

## "getCountryCode"
Retrieves country code of a contact.

**Kind**: event emitted  
<a name="event_getProfilePicUrl"></a>

## "getProfilePicUrl"
Retrieves profile picture URL of a contact.

**Kind**: event emitted  
<a name="event_unblock"></a>

## "unblock"
Unblocks a contact.

**Kind**: event emitted  
