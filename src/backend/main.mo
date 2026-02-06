import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the Access Control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : ?Text;
    phoneNumber : ?Text;
  };

  public type MenuCategory = {
    id : Text;
    name : Text;
    description : Text;
  };

  public type MenuItem = {
    id : Text;
    categoryId : Text;
    name : Text;
    description : Text;
    price : Nat; // Price in paise (e.g., 295_00 for ₹295.00)
    isVegetarian : Bool;
    imageUrl : ?Text;
    isSpecial : Bool;
  };

  public type Reservation = {
    id : Text;
    fullName : Text;
    phoneNumber : Text;
    date : Time.Time;
    time : Text;
    numberOfGuests : Nat;
    notes : ?Text;
    createdTime : Time.Time;
  };

  public type Review = {
    id : Text;
    reviewerName : Text;
    content : Text;
    rating : Nat8; // 1-5 stars
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let menuCategories = Map.empty<Text, MenuCategory>();
  let menuItems = Map.empty<Text, MenuItem>();
  let reservations = Map.empty<Text, Reservation>();
  let reviews = Map.empty<Text, Review>();

  // User Profile Management Functions

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Reservation Management (accessible to all including guests)

  public shared ({ caller }) func createReservation(
    fullName : Text,
    phoneNumber : Text,
    date : Time.Time,
    time : Text,
    numberOfGuests : Nat,
    notes : ?Text,
  ) : async () {
    // Validate inputs (client-side validation already performed)
    if (fullName == "" or phoneNumber == "") {
      Runtime.trap("Missing required fields");
    };

    let reservationId = fullName.concat(Time.now().toText());
    let reservation : Reservation = {
      id = reservationId;
      fullName;
      phoneNumber;
      date;
      time;
      numberOfGuests;
      notes;
      createdTime = Time.now();
    };

    reservations.add(reservationId, reservation);
  };

  // Public Query Functions (accessible to all including guests)

  public query ({ caller }) func getMenuItemsByCategory(categoryId : Text) : async [MenuItem] {
    let menuIter = menuItems.values();
    menuIter.filter(func(item) { item.categoryId == categoryId }).toArray();
  };

  public query ({ caller }) func getMenuCategory(categoryId : Text) : async ?MenuCategory {
    menuCategories.get(categoryId);
  };

  public query ({ caller }) func getAllMenuCategories() : async [MenuCategory] {
    menuCategories.values().toArray();
  };

  public query ({ caller }) func getSpecialMenuItems() : async [MenuItem] {
    let menuIter = menuItems.values();
    menuIter.filter(func(item) { item.isSpecial }).toArray();
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray();
  };

  // Admin functions (authentication required)

  public shared ({ caller }) func addMenuCategory(category : MenuCategory) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    menuCategories.add(category.id, category);
  };

  public shared ({ caller }) func addMenuItem(item : MenuItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    menuItems.add(item.id, item);
  };

  public shared ({ caller }) func updateMenuItem(item : MenuItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    menuItems.add(item.id, item);
  };

  public shared ({ caller }) func deleteMenuItem(itemId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    menuItems.remove(itemId);
  };

  // Seed initial content (admin-only)
  public shared ({ caller }) func seedInitialData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can seed initial data");
    };

    menuCategories.add(
      "starters",
      {
        id = "starters";
        name = "Starters";
        description = "Appetizers and small bites.";
      },
    );

    menuCategories.add(
      "main_course",
      {
        id = "main_course";
        name = "Main Course";
        description = "Hearty entrees and signature dishes.";
      },
    );

    menuCategories.add(
      "breads",
      {
        id = "breads";
        name = "Breads";
        description = "Freshly baked Indian breads.";
      },
    );

    menuCategories.add(
      "desserts",
      {
        id = "desserts";
        name = "Desserts";
        description = "Sweet treats to end your meal.";
      },
    );

    menuCategories.add(
      "beverages",
      {
        id = "beverages";
        name = "Beverages";
        description = "Refreshing drinks and traditional beverages.";
      },
    );

    menuItems.add(
      "paneer_tikka",
      {
        id = "paneer_tikka";
        categoryId = "starters";
        name = "Paneer Tikka";
        description = "Cubes of paneer marinated in tandoori spices and grilled.";
        price = 295_00; // INR 295.00
        isVegetarian = true;
        imageUrl = ?"https://example.com/paneer_tikka.jpg";
        isSpecial = true;
      },
    );

    menuItems.add(
      "samosa",
      {
        id = "samosa";
        categoryId = "starters";
        name = "Vegetable Samosa";
        description = "Crispy pastry filled with spiced potatoes and peas.";
        price = 120_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/samosa.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "chicken_tikka",
      {
        id = "chicken_tikka";
        categoryId = "starters";
        name = "Chicken Tikka";
        description = "Tender chicken pieces marinated in yogurt and spices.";
        price = 325_00;
        isVegetarian = false;
        imageUrl = ?"https://example.com/chicken_tikka.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "butter_chicken",
      {
        id = "butter_chicken";
        categoryId = "main_course";
        name = "Butter Chicken";
        description = "Creamy tomato-based curry with succulent chicken pieces.";
        price = 425_00; // INR 425.00
        isVegetarian = false;
        imageUrl = ?"https://example.com/butter_chicken.jpg";
        isSpecial = true;
      },
    );

    menuItems.add(
      "palak_paneer",
      {
        id = "palak_paneer";
        categoryId = "main_course";
        name = "Palak Paneer";
        description = "Cottage cheese cubes in a creamy spinach gravy.";
        price = 350_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/palak_paneer.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "biryani",
      {
        id = "biryani";
        categoryId = "main_course";
        name = "Hyderabadi Biryani";
        description = "Fragrant basmati rice layered with marinated meat and aromatic spices.";
        price = 475_00;
        isVegetarian = false;
        imageUrl = ?"https://example.com/biryani.jpg";
        isSpecial = true;
      },
    );

    menuItems.add(
      "dal_makhani",
      {
        id = "dal_makhani";
        categoryId = "main_course";
        name = "Dal Makhani";
        description = "Black lentils slow-cooked with butter and cream.";
        price = 280_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/dal_makhani.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "naan",
      {
        id = "naan";
        categoryId = "breads";
        name = "Butter Naan";
        description = "Soft leavened bread brushed with butter.";
        price = 60_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/naan.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "garlic_naan",
      {
        id = "garlic_naan";
        categoryId = "breads";
        name = "Garlic Naan";
        description = "Naan topped with fresh garlic and cilantro.";
        price = 80_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/garlic_naan.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "roti",
      {
        id = "roti";
        categoryId = "breads";
        name = "Tandoori Roti";
        description = "Whole wheat flatbread baked in a tandoor.";
        price = 40_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/roti.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "gulab_jamun",
      {
        id = "gulab_jamun";
        categoryId = "desserts";
        name = "Gulab Jamun";
        description = "Deep-fried milk dumplings soaked in rose-flavored syrup.";
        price = 150_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/gulab_jamun.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "rasmalai",
      {
        id = "rasmalai";
        categoryId = "desserts";
        name = "Rasmalai";
        description = "Soft cheese patties in sweetened, thickened milk.";
        price = 180_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/rasmalai.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "mango_lassi",
      {
        id = "mango_lassi";
        categoryId = "beverages";
        name = "Mango Lassi";
        description = "Refreshing yogurt-based drink with mango pulp.";
        price = 120_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/mango_lassi.jpg";
        isSpecial = false;
      },
    );

    menuItems.add(
      "masala_chai",
      {
        id = "masala_chai";
        categoryId = "beverages";
        name = "Masala Chai";
        description = "Traditional Indian spiced tea with milk.";
        price = 60_00;
        isVegetarian = true;
        imageUrl = ?"https://example.com/masala_chai.jpg";
        isSpecial = false;
      },
    );

    reviews.add(
      "review_1",
      {
        id = "review_1";
        reviewerName = "Rahul Sharma";
        content = "Excellent food! The butter chicken is a must-try.";
        rating = 5 : Nat8;
      },
    );

    reviews.add(
      "review_2",
      {
        id = "review_2";
        reviewerName = "Priya Patel";
        content = "Authentic flavors and great ambiance. Loved the biryani!";
        rating = 5 : Nat8;
      },
    );

    reviews.add(
      "review_3",
      {
        id = "review_3";
        reviewerName = "Amit Kumar";
        content = "Best Indian restaurant in town. The paneer tikka is amazing.";
        rating = 4 : Nat8;
      },
    );
  };
};
