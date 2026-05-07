const SUPABASE_URL = 'https://psqvxtrsgungbsydthua.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcXZ4dHJzZ3VuZ2JzeWR0aHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTY5NjYsImV4cCI6MjA5MzYzMjk2Nn0.xmU08xjfGSwcCjO4P8N0EmEARwTcSpocELhj2nvrDZ4';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper functions
async function saveOrder(order) {
  try {
    const { data, error } = await sb.from('orders').insert([order]);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Order save error:', e);
    return { success: false, error: e.message };
  }
}

async function getOrders() {
  try {
    const { data, error } = await sb.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Orders fetch error:', e);
    return { success: false, error: e.message };
  }
}

async function updateOrder(id, updates) {
  try {
    const { data, error } = await sb.from('orders').update(updates).eq('id', id);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Order update error:', e);
    return { success: false, error: e.message };
  }
}

async function getMenuItems() {
  try {
    const { data, error } = await sb.from('menu_items').select('*');
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Menu fetch error:', e);
    return { success: false, error: e.message };
  }
}

async function updateMenuPrice(id, price) {
  try {
    const { data, error } = await sb.from('menu_items').update({ price }).eq('id', id);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Price update error:', e);
    return { success: false, error: e.message };
  }
}

async function updateMenuItem(id, updates) {
  try {
    const { data, error } = await sb.from('menu_items').update(updates).eq('id', id);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Menu update error:', e);
    return { success: false, error: e.message };
  }
}

async function addMenuItem(item) {
  try {
    const { data, error } = await sb.from('menu_items').insert([item]);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Menu add error:', e);
    return { success: false, error: e.message };
  }
}

async function deleteMenuItem(id) {
  try {
    const { data, error } = await sb.from('menu_items').delete().eq('id', id);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Menu delete error:', e);
    return { success: false, error: e.message };
  }
}

async function getFeatureFlags() {
  try {
    const { data, error } = await sb.from('feature_flags').select('*');
    if (error) throw error;
    const flags = {};
    (data || []).forEach(row => { flags[row.key] = row.enabled; });
    return { success: true, data: flags };
  } catch (e) {
    console.error('Feature flags error:', e);
    return { success: false, error: e.message, data: {} };
  }
}

async function updateFeatureFlag(key, enabled) {
  try {
    const { data, error } = await sb.from('feature_flags').upsert({ key, enabled });
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Feature flag update error:', e);
    return { success: false, error: e.message };
  }
}

async function saveGuest(name, plek) {
  try {
    const { data, error } = await sb.from('guests').upsert({ plek, name, last_seen: new Date().toISOString() });
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Guest save error:', e);
    return { success: false, error: e.message };
  }
}

async function getGuests() {
  try {
    const { data, error } = await sb.from('guests').select('*').order('plek', { ascending: true });
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (e) {
    console.error('Guests fetch error:', e);
    return { success: false, error: e.message, data: [] };
  }
}

async function deleteGuest(plek) {
  try {
    const { data, error } = await sb.from('guests').delete().eq('plek', plek);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Guest delete error:', e);
    return { success: false, error: e.message };
  }
}

async function getWashBookings(date) {
  try {
    const { data, error } = await sb.from('wash_bookings').select('slot_id').eq('date', date);
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (e) {
    console.error('Wash bookings fetch error:', e);
    return { success: false, error: e.message };
  }
}

async function saveWashBooking(booking) {
  try {
    const { data, error } = await sb.from('wash_bookings').insert([booking]);
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('Wash booking error:', e);
    return { success: false, error: e.message };
  }
}
