import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Alert } from 'react-native';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.addToCart} onPress={() => onAddToCart(product)}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username

  const handleSubmit = () => {
    if (isLogin) {
      if (email === 'user1' && password === '1234') {
        Alert.alert('Success', 'Logged in successfully!');
        onLogin(); // Callback to go to the main app
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } else {
      // Sign up logic (now includes username)
      if (username.trim() === '') {
        Alert.alert('Error', 'Username is required.');
      } else {
        Alert.alert('Success', 'Signed up successfully!'); // Placeholder for the actual sign-up logic
        onLogin(); // Callback to go to the main app after sign-up
      }
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Username" // New username input field
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('women');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);

  const menProducts = [
    {
      id: 1,
      title: 'Men\'s T-Shirt',
      price: 29.99,
      description: 'Comfortable and stylish t-shirt for men.',
      image: 'https://via.placeholder.com/300x200/ff7f50/ffffff?text=Men+T-Shirt',
    },
    {
      id: 2,
      title: 'Men\'s Jeans',
      price: 49.99,
      description: 'Classic denim jeans for everyday wear.',
      image: 'https://via.placeholder.com/300x200/4682b4/ffffff?text=Men+Jeans',
    },
    {
      id: 3,
      title: 'Men\'s Jacket',
      price: 89.99,
      description: 'Stylish jacket for colder days.',
      image: 'https://via.placeholder.com/300x200/8b4513/ffffff?text=Men+Jacket',
    },
  ];

  const womenProducts = [
    {
      id: 4,
      title: 'Women\'s Dress',
      price: 59.99,
      description: 'Elegant dress for special occasions.',
      image: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=Women+Dress',
    },
    {
      id: 5,
      title: 'Women\'s Blouse',
      price: 39.99,
      description: 'Chic blouse for casual or formal wear.',
      image: 'https://via.placeholder.com/300x200/ff1493/ffffff?text=Women+Blouse',
    },
    {
      id: 6,
      title: 'Women\'s Skirt',
      price: 49.99,
      description: 'Stylish skirt that pairs well with any top.',
      image: 'https://via.placeholder.com/300x200/9370db/ffffff?text=Women+Skirt',
    },
  ];

  const kidsProducts = [
    {
      id: 7,
      title: 'Kid\'s T-Shirt',
      price: 19.99,
      description: 'Fun and colorful t-shirt for kids.',
      image: 'https://via.placeholder.com/300x200/ffa500/ffffff?text=Kids+T-Shirt',
    },
    {
      id: 8,
      title: 'Kid\'s Shorts',
      price: 24.99,
      description: 'Comfortable shorts for active kids.',
      image: 'https://via.placeholder.com/300x200/adff2f/ffffff?text=Kids+Shorts',
    },
    {
      id: 9,
      title: 'Kid\'s Hooded Sweatshirt',
      price: 34.99,
      description: 'Warm and cozy sweatshirt for chilly days.',
      image: 'https://via.placeholder.com/300x200/00ced1/ffffff?text=Kids+Sweatshirt',
    },
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setModalVisible(true);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const getCurrentProducts = () => {
    switch (currentCategory) {
      case 'men':
        return menProducts;
      case 'women':
        return womenProducts;
      case 'kids':
        return kidsProducts;
      default:
        return womenProducts;
    }
  };

  const filteredProducts = getCurrentProducts().filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckout = () => {
    setPaymentModalVisible(true);
    setModalVisible(false);  // Close the cart modal
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <>
          <View style={styles.navbar}>
            <Text style={styles.navbarTitle}>UZ Marketplace</Text>
            <View style={styles.navbarLinks}>
              <TouchableOpacity
                style={[styles.navbarLink, currentCategory === 'men' && styles.activeLink]}
                onPress={() => handleCategoryChange('men')}
              >
                <Text style={styles.navbarLinkText}>Men</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navbarLink, currentCategory === 'women' && styles.activeLink]}
                onPress={() => handleCategoryChange('women')}
              >
                <Text style={styles.navbarLinkText}>Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navbarLink, currentCategory === 'kids' && styles.activeLink]}
                onPress={() => handleCategoryChange('kids')}
              >
                <Text style={styles.navbarLinkText}>Kids</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {currentCategory === 'men'
                  ? 'Men\'s Products'
                  : currentCategory === 'women'
                  ? 'Women\'s Products'
                  : 'Kid\'s Products'}
              </Text>
              <View style={styles.cardContainer}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </View>
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Items in Cart:</Text>
                {cart.length === 0 ? (
                  <Text style={styles.modalText}>Your cart is empty.</Text>
                ) : (
                  <View style={styles.cartContainer}>
                    {cart.map((item) => (
                      <View key={item.id} style={styles.cartItemContainer}>
                        <Text style={styles.cartItemName}>{item.title}</Text>
                        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => handleRemoveFromCart(item.id)}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={toggleModal}>
                  <Text style={styles.continueButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Payment Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPaymentModalVisible}
            onRequestClose={togglePaymentModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Select Payment Method:</Text>
                <TouchableOpacity style={styles.paymentButton} onPress={togglePaymentModal}>
                  <Text style={styles.paymentButtonText}>Ecocash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentButton} onPress={togglePaymentModal}>
                  <Text style={styles.paymentButtonText}>Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentButton} onPress={togglePaymentModal}>
                  <Text style={styles.paymentButtonText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={togglePaymentModal}>
                  <Text style={styles.continueButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#c00000',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#007BFF',
  },
  navbar: {
    backgroundColor: '#c00000',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navbarLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navbarLink: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeLink: {
    backgroundColor: '#9b0000',
  },
  navbarLinkText: {
    color: '#fff',
    fontSize: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  addToCart: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  cartContainer: {
    width: '100%',
    maxHeight: 300, // Limit height for scrolling
    overflow: 'scroll',
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;