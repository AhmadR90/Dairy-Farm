import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  TextField, 
  IconButton, 
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  GridOn as GridOnIcon,
  Edit as EditIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  FileCopy as FileCopyIcon,
  Visibility as VisibilityIcon,
  Mic as MicIcon,
  ArrowForward as ArrowForwardIcon,
  Group
} from '@mui/icons-material';
import Sidebar from "./Sidebar";

// Initial sample data for messages
const initialMessages = [
  {
    id: 1,
    user: 'Ahmad ',
    avatarInitial: 'AR',
    avatarColor: '#FF6F61',
    message: 'Hello! how is the project going?',
    timestamp: 'Yesterday,01:15 pm',
    isCurrentUser: false,
  },
  {
    id: 2,
    user: 'Ahsan (Team Lead)',
    avatarInitial: 'AA',
    avatarColor: '#FFAB40',
    message: 'Its all good.How is your tasks going?',
    timestamp: 'Today, 12:05 AM',
    isCurrentUser: false,
  },
  {
    id: 3,
    user: 'You (Developer)',
    avatarInitial: 'AH',
    avatarColor: '#FFD740',
    message: "Here's the updated dashboard wireframe for review. Let me know if you need any changes! (Dashboard_v2.png) 22 KB",
    timestamp: 'Today, 09:24 AM',
    isCurrentUser: true,
  },
];

// Sample data for Inbox users with dummy avatars
const initialInboxUsers = [
  {
    id: 1,
    name: 'Zaka Dairy Farm',
    badgeCount: 4,
    avatar: 'https://via.placeholder.com/40',
    messages: initialMessages
  },
  {
    id: 2,
    name: 'Pixel Bits',
    badgeCount: 0,
    avatar: 'https://via.placeholder.com/40',
    selected: true,
    messages: initialMessages
  },
  {
    id: 3,
    name: 'Community Solutions',
    badgeCount: 0,
    avatar: 'https://via.placeholder.com/40',
    messages: initialMessages
  },
  {
    id: 4,
    name: 'Developer',
    badgeCount: 1,
    avatar: 'https://via.placeholder.com/40',
    messages: initialMessages
  },
];

const ChatMessage = () => {
  // State for messages and message input
  const [inboxUsers, setInboxUsers] = useState(initialInboxUsers);
  const [messageInput, setMessageInput] = useState('');
  const [currentChat, setCurrentChat] = useState(inboxUsers.find(user => user.selected) || inboxUsers[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);

  // Current user info
  const currentUser = {
    name: 'You (Developer)',
    avatarInitial: 'AH',
    avatarColor: '#FFD740',
  };

  // Function to generate timestamp
  const getCurrentTimestamp = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `Today, ${displayHours}:${minutes} ${ampm}`;
  };

  // Function to send a message
  const sendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Create a new message
    const newMessage = {
      id: Date.now(),
      user: currentUser.name,
      avatarInitial: currentUser.avatarInitial,
      avatarColor: currentUser.avatarColor,
      message: messageInput,
      timestamp: getCurrentTimestamp(),
      isCurrentUser: true,
    };
    
    // Update the messages for the current chat
    const updatedUsers = inboxUsers.map(user => {
      if (user.id === currentChat.id) {
        return {
          ...user,
          messages: [...(user.messages || []), newMessage],
          badgeCount: 0
        };
      }
      return user;
    });
    
    setInboxUsers(updatedUsers);
    setCurrentChat(updatedUsers.find(user => user.id === currentChat.id));
    setMessageInput('');
    
    // Simulate a reply after a delay for demo purposes
    simulateReply();
  };

  // Function to simulate a reply from another user
  const simulateReply = () => {
    // First show typing indicator
    setTimeout(() => {
      setIsTyping(true);
      setTypingUser('Noor');
    }, 1000);
    
    // Then add reply message after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for the update!",
        "Looks good, I'll review it soon.",
        "Can you add more details to this?",
        "Great work on this one!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const replyMessage = {
        id: Date.now(),
        user: 'Noor (Designer)',
        avatarInitial: 'ND',
        avatarColor: '#8BD4E7',
        message: randomResponse,
        timestamp: getCurrentTimestamp(),
        isCurrentUser: false,
      };
      
      const updatedUsers = inboxUsers.map(user => {
        if (user.id === currentChat.id) {
          return {
            ...user,
            messages: [...(user.messages || []), replyMessage],
          };
        }
        return user;
      });
      
      setInboxUsers(updatedUsers);
      setCurrentChat(updatedUsers.find(user => user.id === currentChat.id));
      setIsTyping(false);
    }, 3000);
  };

  // Function to change the current chat
  const changeCurrentChat = (userId) => {
    // Update selected state and clear badge count
    const updatedUsers = inboxUsers.map(user => ({
      ...user,
      selected: user.id === userId,
      badgeCount: user.id === userId ? 0 : user.badgeCount
    }));
    
    setInboxUsers(updatedUsers);
    setCurrentChat(updatedUsers.find(user => user.id === userId));
    setIsTyping(false);
  };
  
  // Handle key press to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh', // Full viewport height
        // overflow: 'hidden', // Prevent page-level scrollbar
        padding: '90px', // Reduced padding to allow more space for the Chat Window
        boxSizing: 'border-box', // Include padding in the height calculation
        backgroundColor: '#F5F7FA', // Background color to match the image
      }}
    >
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1, // Take up remaining space after the sidebar
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Prevent scrollbar on this container
        }}
      >
        {/* Chat Heading */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'black',
              fontSize: '3rem',
              fontWeight: 'bold',
            }}
          >
            Chat
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#B0BEC5',
              mt: 0.5,
            }}
          >
            Home &gt; Chat
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Teams Column */}
          <Box
            sx={{
              width: 250,
              borderRight: '1px solid #E0E0E0',
              backgroundColor: 'white',
              borderRadius: '8px',
              mr: 1,
              height: '100%', // Take full height
            }}
          >
            
            
            <List sx={{ px: 0 }}>
              {/* Direct Messages Section */}
              <ListItem sx={{ px: 2, py: 1, cursor:"pointer"}}>
                <ListItemIcon>
                  <PersonIcon sx={{ color: '#B0BEC5' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Direct Messages"
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
              <ListItem sx={{ px: 2, py: 1, cursor:"pointer"}}>
                <ListItemIcon>
                  <Group sx={{ color: '#B0BEC5' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Teams"
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
            
              
              {/* Groups Channels Section */}
              <ListItem sx={{ px: 2, py: 1, cursor:"pointer"}}>
                <ListItemIcon>
                  <GroupIcon sx={{ color: '#B0BEC5' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Groups Channels"
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
            </List>
          </Box>

          {/* Inbox Column */}
          <Box
            sx={{
              width: 250,
              borderRight: '1px solid #E0E0E0',
              backgroundColor: 'white',
              borderRadius: '8px',
              mr: 1,
              height: '100%', // Take full height
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                px: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#212121',
              }}
            >
              Inbox
            </Typography>
            
            <List sx={{ px: 1 }}>
              {inboxUsers.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{
                    px: 2,
                    py: 1,
                    mb: 1,
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    bgcolor: user.selected ? '#E3F2FD' : 'white',
                    '&:hover': {
                      bgcolor: user.selected ? '#E3F2FD' : '#F5F7FA',
                      cursor: 'pointer',
                    },
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => changeCurrentChat(user.id)}
                >
                  <ListItemIcon>
                    <Badge badgeContent={user.badgeCount} color="error">
                      <Avatar
                        src={user.avatar}
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: '#8BD4E7', // Set background color for avatars
                        }}
                      >
                        {/* Fallback to initials if image fails to load */}
                        {user.name.charAt(0)}
                      </Avatar>
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={user.name}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: user.selected ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Chat Window */}
          <Box
            sx={{
              flex: 2, // Increased flex to make the Chat Window wider
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #CACACA',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F5F7FA',
              minWidth: '600px', // Set a minimum width to ensure it's wider
            }}
          >
            {/* Chat Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
                backgroundColor: 'white',
                borderBottom: '1px solid #E0E0E0',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  {currentChat.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    ml: 1,
                    color: '#B0BEC5',
                    fontSize: '0.9rem',
                  }}
                >
                  [5 Members]
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <IconButton>
                  <VisibilityIcon sx={{ color: '#B0BEC5', fontSize: '1.5rem' }} />
                </IconButton>
                <IconButton>
                  <MicIcon sx={{ color: '#B0BEC5', fontSize: '1.5rem' }} />
                </IconButton>
                <IconButton>
                  <ArrowForwardIcon sx={{ color: '#B0BEC5', fontSize: '1.5rem' }} />
                </IconButton>
              </Box>
            </Box>

            {/* Message List */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto', // Allow scrolling only in the message list
                p: 2,
                backgroundColor: 'white',
              }}
            >
              <Stack spacing={3}>
                {currentChat.messages && currentChat.messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        maxWidth: '70%',
                        flexDirection: msg.isCurrentUser ? 'row-reverse' : 'row',
                      }}
                    >
                      {/* Avatar */}
                      {!msg.isCurrentUser && (
                        <Avatar
                          sx={{
                            bgcolor: msg.avatarColor,
                            width: 40,
                            height: 40,
                            mr: 1.5,
                            ml: 0,
                            fontSize: '1rem',
                          }}
                        >
                          {msg.avatarInitial}
                        </Avatar>
                      )}

                      {/* Message Content */}
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start',
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '0.9rem',
                              mr: msg.isCurrentUser ? 0 : 1,
                              ml: msg.isCurrentUser ? 1 : 0,
                            }}
                          >
                            {msg.user}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                            {msg.timestamp}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: msg.isCurrentUser ? '#E3F2FD' : 'white',
                            p: 1.5,
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: msg.isCurrentUser ? 'none' : '1px solid #E0E0E0',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.9rem',
                              color: '#212121',
                              wordBreak: 'break-word',
                            }}
                          >
                            {msg.message}
                          </Typography>
                        </Box>
                      </Box>

                      {msg.isCurrentUser && (
                        <Avatar
                          sx={{
                            bgcolor: msg.avatarColor,
                            width: 40,
                            height: 40,
                            ml: 1.5,
                            mr: 0,
                            fontSize: '1rem',
                          }}
                        >
                          {msg.avatarInitial}
                        </Avatar>
                      )}
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Stack>

              {/* Typing Indicator */}
              {isTyping && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#B0BEC5' }}>
                    <Chip 
                      label={`${typingUser} is typing...`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#F5F7FA',
                        color: '#B0BEC5',
                        fontWeight: 'normal',
                        fontSize: '0.8rem',
                      }} 
                    />
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                p: 1.5,
                backgroundColor: 'white',
                borderTop: '1px solid #E0E0E0',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ mr: 1 }}>
                  <EditIcon sx={{ color: '#B0BEC5', fontSize: '1.2rem' }} />
                </IconButton>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  size="small"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{
                    backgroundColor: '#F5F7FA',
                    borderRadius: '20px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.9rem',
                      padding: '8px 12px',
                    },
                  }}
                />
                <IconButton 
                  color="primary" 
                  sx={{ ml: 1 }}
                  onClick={sendMessage}
                  disabled={messageInput.trim() === ''}
                >
                  <SendIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;